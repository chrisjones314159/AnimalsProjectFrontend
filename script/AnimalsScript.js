"use strict";

const output = document.querySelector("div#output");



// Create event
document.querySelector("#animalForm").addEventListener("submit", function(event) {
    event.preventDefault(); 

    console.log("THIS:", this);

    const form = this;

    // Data that is passed to back-end to create new item in database
    const data = {
        name: form.name.value,
        imageUrl: form.image.value,
        age: form.age.value,
        colour: form.colour.value,
        cute: form.cute.value
    };

    console.log("DATA: ", data);

    axios
        .post("http://localhost:8080/create", data)
        .then(res => {
            output.innerHTML = "";
            getAnimals();
            form.reset();
            form.name.focus(); 
            console.log(res);
        })
        .catch(err => console.error(err));
});








// Update event
document.querySelector("#animalFormUpdate").addEventListener("submit", function(event) {
    event.preventDefault(); 

    console.log("THIS:", this);

    const form = this; 

    // Data that is passed to back-end to update an existing item in database
    const data = {
        name: form.name.value,
        imageUrl: form.image.value,
        age: form.age.value,
        colour: form.colour.value,
        cute: form.cute.value
    
    };

    console.log("DATA: ", data);

    axios
        .put(`http://localhost:8080/replace/${form.animalId.value}`, data)
        .then(res => {
            output.innerHTML = "";
            getAnimals();
            form.reset(); 
            form.animalId.focus(); 
            console.log(res);
        })
        .catch(err => console.error(err));
});







// Resets the display once back-end has been changed
document.querySelector("button#resetDisplay").addEventListener("click", resetDisplay);

function resetDisplay() {
    output.innerHTML = "";
    getAnimals();
}









// Find by name event
document.querySelector("form#display").addEventListener("submit", findByName);

const form = this;

function findByName() {
    event.preventDefault();
    output.innerHTML = "";
    axios
        .get(`http://localhost:8080/getByName/${form.searchName.value}`)
        .then(res => {
            
            console.log(res);
            
            const animals = document.createElement("ul");
            for (let animal of res.data) {


                const animalCol = document.createElement("div");
                animalCol.classList.add("col");
                

                const animalCard = document.createElement("div");
                animalCard.classList.add("card");
                animalCol.appendChild(animalCard);


                const newAnimal = document.createElement("div");
                newAnimal.classList.add("card-body");


                const animalBody = document.createElement("div");
                animalBody.classList.add("card-body");

                
                const animalName = document.createElement("h4");
                animalName.innerText = animal.name;
                animalName.style.textAlign = "center"
                newAnimal.appendChild(animalName);
                animalName.classList.add("card-text");
                animals.appendChild(animalName);


                const animalAge = document.createElement("p");
                animalAge.classList.add("card-text");
                animalAge.innerText = "Age: " + animal.age;
                animalBody.appendChild(animalAge);
                newAnimal.appendChild(animalAge);
                animals.appendChild(animalAge);


                const animalColour = document.createElement("p");
                animalColour.classList.add("card-text");
                animalColour.innerText = `Colour: ${animal.colour}`;
                animalBody.appendChild(animalColour);
                newAnimal.appendChild(animalColour);
                animals.appendChild(animalColour);


                const animalIsCute = document.createElement("p");
                animalIsCute.classList.add("card-text");
                animalIsCute.innerText = `Cute: ${animal.cute}`;
                animalBody.appendChild(animalIsCute);
                newAnimal.appendChild(animalIsCute);
                animals.appendChild(animalIsCute);


                const animalImage = document.createElement("img");
                animalImage.style.width = "250px"
                animalImage.style.height = "250px"
                animalImage.classList.add("card-image-top");
                animalImage.src = `${animal.imageUrl}`
                animalImage.innerText = "hello";
                animalBody.appendChild(animalImage);
                newAnimal.appendChild(animalImage);
                animals.appendChild(animalImage);


                const animalId = document.createElement("p");
                animalId.classList.add("card-text");
                animalId.innerText = `ID : ${animal.id}`;
                animalBody.appendChild(animalId);
                newAnimal.appendChild(animalId);
                animals.appendChild(animalId);
                

                const animalDelete = document.createElement("button");
                animalDelete.innerText = "DELETE";
                animalDelete.classList.add("btn", "btn-danger");
                animalDelete.addEventListener("click", () => {
                    axios
                        .delete(`http://localhost:8080/remove/${animal.id}`)
                        .then(response => {
                            output.innerHTML = "";
                            getAnimals();
                        })
                        .catch(err => console.error(err))
                });


                animalBody.appendChild(animalName);
                animalBody.appendChild(animalImage);
                animalBody.appendChild(animalAge);
                animalBody.appendChild(animalColour);
                animalBody.appendChild(animalIsCute);
                animalBody.appendChild(animalId);
                animalBody.appendChild(animalDelete);
                
                
                animalCard.appendChild(animalBody);
                animalCol.appendChild(animalCard);


                output.appendChild(animalCol);
                animalCard.appendChild(newAnimal);
            }
            output.appendChild(animals);
        })
        .catch(err => console.error(err));
}


















// Displays all of the animals items in the ouptut div
function getAnimals() {
    axios
        .get("http://localhost:8080/getAll")
        .then(res => {
            
            const animals = document.createElement("ul");


            for (let animal of res.data) {

                const animalCol = document.createElement("div");
                animalCol.classList.add("col");
                

                const animalCard = document.createElement("div");
                animalCard .classList.add("card");
                animalCol.appendChild(animalCard);


                const newAnimal = document.createElement("div");
                newAnimal.classList.add("card-body");

                
                const animalBody = document.createElement("div");
                animalBody.classList.add("card-body");

                
                const animalName = document.createElement("h4");
                animalName.innerText = animal.name;
                animalName.style.textAlign = "center"
                newAnimal.appendChild(animalName);
                animalName.classList.add("card-text");
                animals.appendChild(animalName);


                const animalAge = document.createElement("p");
                animalAge.classList.add("card-text");
                animalAge.classList.add("font-weight-bold");
                animalAge.innerText = "Age: " + animal.age;
                animalBody.appendChild(animalAge);
                newAnimal.appendChild(animalAge);
                animals.appendChild(animalAge);


                const animalColour = document.createElement("p");
                animalColour.classList.add("card-text");
                animalColour.innerText = `Colour: ${animal.colour}`;
                animalBody.appendChild(animalColour);
                newAnimal.appendChild(animalColour);
                animals.appendChild(animalColour);


                const animalIsCute = document.createElement("p");
                animalIsCute.classList.add("card-text");
                animalIsCute.innerText = `Cute: ${animal.cute}`;
                animalBody.appendChild(animalIsCute);
                newAnimal.appendChild(animalIsCute);
                animals.appendChild(animalIsCute);


                const animalId = document.createElement("p");
                animalId.classList.add("card-text");
                animalId.innerText = `ID : ${animal.id}`;
                animalBody.appendChild(animalId);
                newAnimal.appendChild(animalId);
                animals.appendChild(animalId);


                const animalImage = document.createElement("img");
                animalImage.style.width = "250px"
                animalImage.style.height = "250px"
                animalImage.classList.add("card-image-top");
                animalImage.src = `${animal.imageUrl}`
                animalImage.innerText = "hello";
                animalBody.appendChild(animalImage);
                newAnimal.appendChild(animalImage);
                animals.appendChild(animalImage);
                

                const animalDelete = document.createElement("button");
                animalDelete.innerText = "DELETE";
                animalDelete.classList.add("btn", "btn-danger", "delete");
                animalDelete.addEventListener("click", () => {
                    axios
                        .delete(`http://localhost:8080/remove/${animal.id}`)
                        .then(response => {
                            output.innerHTML = "";
                            getAnimals();
                        })
                        .catch(err => console.error(err))
                });


                animalBody.appendChild(animalName);
                animalBody.appendChild(animalImage)
                animalBody.appendChild(animalAge);
                animalBody.appendChild(animalColour);
                animalBody.appendChild(animalIsCute);
                animalBody.appendChild(animalId);
                animalBody.appendChild(animalDelete);
                
                
                animalCard.appendChild(animalBody);
                animalCol.appendChild(animalCard);


                output.appendChild(animalCol);
                animalCard.appendChild(newAnimal);  
            }

            output.appendChild(animals);
            
            
        })
        .catch(err => console.error(err));
}


getAnimals();