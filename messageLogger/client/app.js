let coasterReviewWrapper = document.querySelector("section");
let editId = null;
let inputCoasterName = document.querySelector("#input-coaster-name")
let inputCoasterReview = document.querySelector("#input-coaster-review")
let inputCoasterRating = document.querySelector("#rating")
let saveReviewButton = document.querySelector("#save-review-button")
function addCoasterReview(data){
    let coasterName = document.createElement("h3");
    coasterName.textContent = data["name"];
    let coasterReview = document.createElement("p");
    coasterReview.textContent = data["review"];
    let coasterRating = document.createElement("p");
    coasterRating.textContent = data["rating"];
    coasterReviewWrapper.appendChild(coasterName);
    coasterReviewWrapper.appendChild(coasterReview);
    coasterReviewWrapper.appendChild(coasterRating);
    let editButton = document.createElement("button");
    editButton.textContent = "Edit Review";
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete Review";
    editButton.onclick = function(){
        console.log("edit button clicked on: ", data["id"])
        inputCoasterName.value = data["name"];
        inputCoasterReview.value = data["review"];
        inputCoasterRating.value = data["rating"];
        editId = data["id"];
    }
    saveReviewButton.onclick = function(){
        let editData = "name="+encodeURIComponent(inputCoasterName.value) + "&review="+encodeURIComponent(inputCoasterReview.value)+ "&rating="+encodeURIComponent(inputCoasterRating.value)
        // send new review value to the server
        fetch(`http://localhost:8080/rollercoasters/${editId}`, {
            method: "PUT",
            body: editData,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(function(response){
            console.log("response: ", response)
            clearLoadedCoasters()
            loadRollerCoastersFromServer()
            inputCoasterName.value = ""
            inputCoasterReview.value = ""
            inputCoasterRating.value = ""   
        })

    }
    deleteButton.onclick = function(){
        if(confirm("Are you sure you want to delete this review?")){
            
            let deleteId = data["id"]
            // send new review value to the server
            fetch(`http://localhost:8080/rollercoasters/${deleteId}`, {
            method: "DELETE",
            body: "",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(function(response){
            console.log("response: ", response)
            clearLoadedCoasters()
            loadRollerCoastersFromServer()
        })
        
    }
    }
    coasterReviewWrapper.appendChild(editButton);
    coasterReviewWrapper.appendChild(deleteButton);
    coasterReviewWrapper.appendChild(document.createElement("hr"));
}
function loadRollerCoastersFromServer() {
    fetch("http://localhost:8080/rollercoasters")
        .then(function(response){
        response.json()
        .then(function(data){

            let rollerCoasters = data
            rollerCoasters.forEach(addCoasterReview)
        });
    })
}
function clearLoadedCoasters(){
    coasterReviewWrapper.textContent = ""
}

let addReviewButton = document.querySelector("#add-review-button");
function addNewReview(){
    let inputCoasterName = document.querySelector("#input-coaster-name")
    let inputCoasterReview = document.querySelector("#input-coaster-review")
    let inputCoasterRating = document.querySelector("#rating")
    //prep data to send to server
    let data = "name="+encodeURIComponent(inputCoasterName.value) + "&review="+encodeURIComponent(inputCoasterReview.value)+ "&rating="+encodeURIComponent(inputCoasterRating.value)
    // send new review value to the server
    console.log(data)
    fetch("http://localhost:8080/rollercoasters", {
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }).then(function(response){
        console.log("response: ", response)
        clearLoadedCoasters()
        loadRollerCoastersFromServer()
        inputCoasterName.value = ""
        inputCoasterReview.value = ""
        inputCoasterRating.value = ""   
    })
}


addReviewButton.onclick = addNewReview;
loadRollerCoastersFromServer()