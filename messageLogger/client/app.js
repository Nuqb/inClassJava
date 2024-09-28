console.log("connected");

let coasterReviewWrapper = document.querySelector("section");

function addCoasterReview(name){
    let coasterName = document.createElement("h3");
    coasterName.textContent = name;
    document.coasterReviewWrapper.appendChild(coasterName);
}

function loadRollercoastersFromServer() {
     fetch("http://localhost:8080/rollercoasters")
        .then(function(response){
            response.json()
                .then(function(data){
                    console.log(data)
                    let rollercoasters = data;
                    rollerCoasters.forEach(addCoasterReview)
                })
        })
}

let addReviewButton = document.querySelector("#add-review-button")
function addNewReview() {
    console.log("button clicked");
    let inputCoasterName = document.querySelector("#input-coaster-name");
    console.log(inputCoasterName.value);
    //prep data to send to server
    let data = "name=" + encodeURIComponent(inputCoasterName.value);
    // data += "&review" + encodeURIComponent(inputCoasterName.value);
    //send new review value to the server
    fetch("http://localhost:8080/rollercoasters",{
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }).then(function(response){
        console.log("New review created", response)
        coasterReviewWrapper.textContent = "";
        loadRollercoastersFromServer()
    })
}

addReviewButton.onclick = addNewReview;

loadRollercoastersFromServer()