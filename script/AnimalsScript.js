"use strict"

const output = document.querySelector("div#output");

// document.querySelector("button#delete").addEventListener("click", animalDelete);



axios.get("http://localhost:8080/getAll")
    .then(response => {
        const animalsData = response.data;
        console.log(response);
    




        const animals = document.createElement("ul");
        for (let animal of animalsData){

            const animalCol = document.createElement("div")
            animalCol.classList.add("col");

            const animalCard = document.createElement("div");
            animalCard.classList.add("card");
            animalCol.appendChild(animalCard);


            const newAnimal = document.createElement("div");
            newAnimal.classList.add("card-body");

            const animalName = document.createElement("h4");
            animalName.classList.add("card-title");
            animalName.innerText = "Name: " + animal.name;
            animals.appendChild(animalName)
            newAnimal.appendChild(animalName);

            const animalAge = document.createElement("p");
            animalAge.classList.add("card-text");
            animalAge.innerText = "Age: " + animal.age + " years old";
            animals.appendChild(animalAge)
            newAnimal.appendChild(animalAge);

            const animalColour = document.createElement("p");
            animalColour.classList.add("card-text");
            animalColour.innerText = "Colour: " + animal.colour;
            animals.appendChild(animalColour)
            newAnimal.appendChild(animalColour);

            const animalIsCute = document.createElement("p");
            animalIsCute.classList.add("card-text");
            animalIsCute.innerText = "Cute: " + animal.cute;
            animals.appendChild(animalIsCute)
            newAnimal.appendChild(animalIsCute);


            const animalId = document.createElement("p");
            animalId.classList.add("card-text");
            animalId.innerText = "ID: " + animal.id;
            animals.appendChild(animalId)
            newAnimal.appendChild(animalId);




            const animalDelete = document.createElement("button");
            animalDelete.innerText = "Delete";
            animalDelete.classList.add("btn", "btn-danger", "card-body", "delete");
            animals.appendChild(animalDelete);
            newAnimal.appendChild(animalDelete);

          


            output.appendChild(animalCol);
            animalCard.appendChild(newAnimal);
            
        }
        
        output.appendChild(animals);

    }).catch(err => console.error(err));



    function animalDelete(){
        axios.delete(`http://localhost:8080/remove/${animal.id}`)
        .then(response => {
            console.log("deleted");
        }).catch(err => console.error(err));
    }