const country=document.getElementById("country");
const nombre=document.getElementById("nombre");
const lastName=document.getElementById("lastName");
const id=document.getElementById("id");
const form=document.getElementById("form");
const btnSave=document.getElementById("btnSave");
const indice=document.getElementById("indice");
const btnClose=document.getElementById("btnClose");
const btnX=document.getElementById("btnX");

const listOwner=document.getElementById("list-owner");

let owners=[
    {
        country:"Brasil",
        id:"594845",
        nombre:"Pablo",
        lastName:"Puentes",
    },
    {
        country:"Ecuador",
        id:"48554845",
        nombre:"Esteban",
        lastName:"Quito",
    }
];


function toListOwners(){
    const htmlOwners= owners.map((owner, index)=>`<tr>
            <th scope="row">${index}</th>
            <td>${owner.country}</td>
            <td>${owner.id}</td>
            <td>${owner.nombre}</td>
            <td>${owner.lastName}</td>
            <td>
            <div class="btn-group" role="group" aria-label="Basic example">
            <button type="button" class="btn btn-info edit"  data-toggle="modal" data-target="#exampleModalCenter"><i class="fas fa-edit"></i></button>
            <button type="button" class="btn btn-danger delete"><i class="fas fa-trash"></i></button>
            </div>
            </td>
            </tr>`).join("");
        listOwner.innerHTML=htmlOwners;
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
            owners[indice.value] = data;  
            break;
        default:
            //create
            owners.push(data);
            break;
    }
    toListOwners();
    resetModal();
}

function edit(index){
    return function ClickIt(){
        btnSave.innerHTML='Edit';
        $('#exampleModalCenter').modal('toggle');
        const owner = owners[index];
        indice.value=index;
        country.value=owner.country;
        id.value=owner.id;
        nombre.value=owner.nombre;
        lastName.value=owner.lastName;
    }
}

function deleteData(index){
    return function clickDelete(){
        owners=owners.filter((owner,indexOwner)=>indexOwner !== index);//Este metodo filtra todos los elementos del array y devuelve los elementos que no filtro
        toListOwners();

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
toListOwners();
form.onsubmit = submitData;
btnSave.onclick=submitData;
btnClose.onclick=resetModal;
btnX.onclick=resetModal;