let coasterReviewWrapper = document.querySelector("section");

function addCoasterReview(data){
    console.log("data in addCoasterReview: ", data)
    let coasterName = document.createElement("h3");
    coasterName.textContent = data["name"];
    let coasterReview = document.createElement("p");
    coasterReview.textContent = data["review"];
    let coasterRating = document.createElement("p");
    coasterRating.textContent = data["rating"];
    coasterReviewWrapper.appendChild(coasterName);
    coasterReviewWrapper.appendChild(coasterReview);
    coasterReviewWrapper.appendChild(coasterRating);
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