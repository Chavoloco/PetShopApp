const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;

let resourses = {
    pets:[
        {type: "Dog", name:"Trosky", owner: "Jeremias"},
        {type: "Cat", name:"Garfield", owner: "Carla"},
        {type: "Fish", name:"Sushi", owner: "Raul"},
        {type: "Bird", name:"Piolin", owner: "Maria"},
        {type: "Iguana", name:"Django", owner: "Juana"},
    ],
}

const hostname = '127.0.0.1';
const port = 3000;

const callBackServer = (req, res) => {

    // 1.obtener url desde el objeto request //ok
    const urlActual = req.url;
    const urlParse = url.parse(urlActual, true);

    // 2.obtener ruta
    const ruta = urlParse.pathname;

    // 3.quitar slash '/' 
    const rutaLimpia = ruta.replace(/^\/+|\/+$/g, '');

    // 3.1.obtener el metodo http
    const method = req.method.toLocaleLowerCase(); 

    // 3.2.obtener variables del query url, las variables que pasamos por la url con ?var1=1&var2=2&var3=3
    // const query  = urlParse.query;
    const { query = {} }  = urlParse;
    console.log(query);

    //3.3 obtener los headers
    const { headers }  = req;
    console.log({headers});

    //3.4 obtener payloads en el caso que hubiera
    const decoder = new StringDecoder('utf-8');

    //3.4.1 Ir acumulando la data cuando el request reciba un payload
    let buffer = '';
    req.on('data', (data)=>{
        buffer += decoder.write(data);
    });
    
    //3.4.2 Terminar de acumular datos y decirle al decoder que finalize, si lo dejo abierto podría interferir con otro request
    req.on('end', ()=>{
        buffer += decoder.end();

        if(headers["content-type"] === "application/json"){
            buffer = JSON.parse(buffer);
        }

        //3.4.3 revisar si tiene sub-rutas en este caso es el indice del array
        if(rutaLimpia.indexOf('/') > -1){
            var [rutaPrincipal, indice] = rutaLimpia.split('/');
        }

        //3.5 Ordenar la data del request
        const data= {
            indice,
            ruta: rutaPrincipal || rutaLimpia,
            query,
            method,
            headers,
            payload: buffer
        };

        console.log({data});

        //3.6 Elegir el maejador dependiendo de la ruta y asignarle la función que el enrutador tiene
        let handler;
        if(data.ruta && enrutador[data.ruta] && enrutador[data.ruta][method]){
            handler = enrutador[data.ruta][method];
        }else{
            handler = enrutador.noEncontrado;
        }
        
        res.setHeader('Content-Type', 'text/plain');

        // 4.ejecutar handler (manejador) para enviar la respuesta
        if(typeof handler === 'function') {
            handler(data, (statusCode = 200, mensaje)=>{
                const respuesta = JSON.stringify(mensaje);
                res.setHeader('Content-Type', "application/json")
                res.writeHead(statusCode);
                //linea donde realmente ya estamos respondiendo a la aplicación cliente
                res.end(respuesta);
            });
        }
     
    });
};

const enrutador = {
    ruta: (data, callback) => {
        // creamos la ruta y creamos un manejador de esa ruta, handler
        callback(200, {mensaje: 'esta es ruta'}); 
        // res.statusCode = 200;
    },
    pets: {
        
        get:(data, callback) => {
            if(typeof data.indice !== "undefined"){
                if(resourses.pets[data.indice]){
                    return callback(200, resourses.pets[data.indice]); 
                }
                return callback(404, { mensaje: `pets con indice ${data.indice} no encontrado` })
            }
            callback(200, resourses.pets); 
        },
        post:(data, callback) => {
            resourses.pets.push(data.payload);
            callback(201, data.payload); 
        },
    },
    noEncontrado: (data, callback) => {
        callback(404, {mensaje: 'no encontrado'});
    }
}

const server =  http.createServer(callBackServer);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});