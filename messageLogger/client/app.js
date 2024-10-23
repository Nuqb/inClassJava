let coasterReviewWrapper = document.querySelector("#coaster-review-wrapper");

function addCoasterReview(data){
    console.log("data in addCoasterReview: ", data)
    let coasterName = document.createElement("h3");
    coasterName.textContent = data.name;
    let coasterReview = document.createElement("p");
    coasterReview.textContent = data.review;
    let coasterRating = document.createElement("p");
    coasterRating.textContent = data.rating;
    let editButton = document.createElement("button");
    editButton.textContent = "Edit";
    let coasterSeperator = document.createElement("hr");
    coasterReviewWrapper.appendChild(coasterName);
    coasterReviewWrapper.appendChild(coasterReview);
    coasterReviewWrapper.appendChild(coasterRating);
    coasterReviewWrapper.appendChild(editButton);
    coasterReviewWrapper.appendChild(coasterSeperator);

    editButton.onclick = function(){
        console.log("coaster id: ", data.id)
        let editCoasterName = document.querySelector("#edit-coaster-name");
        console.log(editCoasterName.value);
        let editCoasterReview = document.querySelector("#edit-coaster-review");
        console.log(editCoasterReview.value);
        let editCoasterRating = document.querySelector("#edit-coaster-rating");
        console.log(editCoasterRating.value);

        let editData = "name=" + encodeURIComponent(editCoasterName.value)
        editData += "&review=" + encodeURIComponent(editCoasterReview.value)
        editData += "&rating=" + encodeURIComponent(editCoasterRating.value)
        console.log("data: ", editData)

        fetch("http://localhost:8080/rollercoasters/" + data.id, {
            method: "PUT",
            body: editData,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(function(response){
            console.log("Updated: ", response)
        })
    }
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
    })
}

addReviewButton.onclick = addNewReview;
loadRollerCoastersFromServer()