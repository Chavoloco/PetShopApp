const country=document.getElementById("country");
const nombre=document.getElementById("nombre");
const lastName=document.getElementById("lastName");
const id=document.getElementById("id");
const form=document.getElementById("form");
const btnSave=document.getElementById("btnSave");
const indice=document.getElementById("indice");
const btnClose=document.getElementById("btnClose");
const btnX=document.getElementById("btnX");

const listVet=document.getElementById("list-vet");

let vets=[
    {
        country:"Argentina",
        id:"4587846",
        nombre:"Rene",
        lastName:"Favaloro",
    },
    {
        country:"Bolivia",
        id:"455486548",
        nombre:"Raul",
        lastName:"Alfonsin",
    }
];


function toListVets(){
    const htmlVets= vets.map((vet, index)=>`<tr>
            <th scope="row">${index}</th>
            <td>${vet.country}</td>
            <td>${vet.id}</td>
            <td>${vet.nombre}</td>
            <td>${vet.lastName}</td>
            <td>
            <div class="btn-group" role="group" aria-label="Basic example">
            <button type="button" class="btn btn-info edit"  data-toggle="modal" data-target="#exampleModalCenter"><i class="fas fa-edit"></i></button>
            <button type="button" class="btn btn-danger delete"><i class="fas fa-trash"></i></button>
            </div>
            </td>
            </tr>`).join("");
        listVet.innerHTML=htmlVets;
    Array.from(document.getElementsByClassName("edit")).forEach((editButton,index)=>editButton.onclick=edit(index));
    Array.from(document.getElementsByClassName("delete")).forEach((deleteButton,index)=>deleteButton.onclick=deleteData(index));
}

function submitData(event){
    event.preventDefault();
    const data ={
        country: country.value,
        id: id.value,
        nombre: nombre.value,
        lastName: lastName.value,
    };
    const action=btnSave.innerHTML;
    switch(action){
        case 'Edit':
            //edit
            vets[indice.value] = data;  
            break;
        default:
            //create
            vets.push(data);
            break;
    }
    toListVets();
    resetModal();
}

function edit(index){
    return function ClickIt(){
        btnSave.innerHTML='Edit';
        $('#exampleModalCenter').modal('toggle');
        const vet = vets[index];
        indice.value=index;
        country.value=vet.country;
        id.value=vet.id;
        nombre.value=vet.nombre;
        lastName.value=lastName;
    }
}

function deleteData(index){
    return function clickDelete(){
        vets=vets.filter((vet,indexVet)=>indexVet !== index);//Este metodo filtra todos los elementos del array y devuelve los elementos que no filtro
        toListVets();

    }
}

function resetModal(){
    country.value='';
    id.value='';
    nombre.value='';
    lastName.value='';
    indice.value='';
    btnSave.innerHTML='Create';
}
toListVets();
form.onsubmit = submitData;
btnSave.onclick=submitData;
btnClose.onclick=resetModal;
btnX.onclick=resetModal;