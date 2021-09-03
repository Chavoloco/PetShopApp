module.exports ={
    ruta: (data, callback) => {
        // creamos la ruta y creamos un manejador de esa ruta, handler
        callback(200, {mensaje: 'esta es ruta'}); 
        // res.statusCode = 200;
    },
    pets: {
        
        get:(data, callback) => {
            if(typeof data.indice !== "undefined"){
                if(global.resourses.pets[data.indice]){
                    return callback(200, global.resourses.pets[data.indice]); 
                }
                return callback(404, { mensaje: `pets con indice ${data.indice} no encontrado` })
            }
            callback(200, global.resourses.pets); 
        },
        post:(data, callback) => {
            global.resourses.pets.push(data.payload);
            callback(201, data.payload); 
        },
    },
    noEncontrado: (data, callback) => {
        callback(404, {mensaje: 'no encontrado'});
    }
}

