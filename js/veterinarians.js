const country=document.getElementById("country");
const name=document.getElementById("name");
const lastName=document.getElementById("lastName");
const identification=document.getElementById("identification");
const form=document.getElementById("form");
const btnSave=document.getElementById("btnSave");
const indice=document.getElementById("indice");
const btnClose=document.getElementById("btnClose");
const btnX=document.getElementById("btnX");

const listVet=document.getElementById("list-vet");

let pets=[
    {
        country:"Argentina",
        identification:"4587846",
        nombre:"Rene",
        lastName:"Favaloro"
    },
    {
        country:"Bolivia",
        identification:"455486548",
        nombre:"Raul",
        lastName:"Alfonsin"
    }
];


function toListPets(){
    const htmlPets= pets.map((pet, index)=>`<tr>
            <th scope="row">${index}</th>
            <td>${pet.type}</td>
            <td>${pet.nombre}</td>
            <td>${pet.owner}</td>
            <td>
            <div class="btn-group" role="group" aria-label="Basic example">
            <button type="button" class="btn btn-info edit"  data-toggle="modal" data-target="#exampleModalCenter"><i class="fas fa-edit"></i></button>
            <button type="button" class="btn btn-danger delete"><i class="fas fa-trash"></i></button>
            </div>
            </td>
            </tr>`).join("");
    listPets.innerHTML=htmlPets;
    Array.from(document.getElementsByClassName("edit")).forEach((editButton,index)=>editButton.onclick=edit(index));
    Array.from(document.getElementsByClassName("delete")).forEach((deleteButton,index)=>deleteButton.onclick=deleteData(index));
}

function submitData(event){
    event.preventDefault();
    const data ={
        type: type.value,
        nombre: nombre.value,
        owner: owner.value
    };
    const action=btnSave.innerHTML;
    switch(action){
        case 'Edit':
            //edit
            pets[indice.value] = data;  
            break;
        default:
            //create
            pets.push(data);
            break;
    }
    toListPets();
    resetModal();
}

function edit(index){
    return function ClickIt(){
        btnSave.innerHTML='Edit';
        $('#exampleModalCenter').modal('toggle');
        const pet = pets[index];
        nombre.value=pet.nombre;
        owner.value=pet.owner;
        type.value=pet.type;
        indice.value=index;
    }
}

function deleteData(index){
    return function clickDelete(){
        pets=pets.filter((pet,indexPet)=>indexPet !== index);//Este metodo filtra todos los elementos del array y devuelve los elementos que no filtro
        toListPets();

    }
}

function resetModal(){
    nombre.value='';
    owner.value='';
    type.value='';
    indice.value='';
    btnSave.innerHTML='Create';
}
toListPets();
form.onsubmit = submitData;
btnSave.onclick=submitData;
btnClose.onclick=resetModal;
btnX.onclick=resetModal;