let pets=[
    {
        type:"Gat",
        name:"Garfield",
        owner:"Raul"
    }
];


function listPets(){
    let htmlPets= pets.map((pet, index)=>`<tr>
    <th scope="row">${index}</th>
    <td>${pet.type}</td>
    <td>${pet.name}</td>
    <td>${pet.owner}</td>
    <td>
        <div class="btn-group" role="group" aria-label="Basic example">
            <button type="button" class="btn btn-info"><i class="fas fa-edit"></i></button>
            <button type="button" class="btn btn-danger"><i class="fas fa-trash"></i></button>
        </div>
    </td>
</tr>`);
}