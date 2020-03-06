function calculateFibonacci(termNumber) {
    fetch("http://localhost:5050/fibonacci/" + termNumber)
        .then((resp) => resp.text())
        .then(function (data) {
            document.getElementById("spinner").style.display = "none";

            if (isValidJSON(data)) {
                let myJSON = JSON.parse(data);
                term.innerText = myJSON.result;
                document.getElementById("term").style.display = "block";
            } else {
                meaning.innerText = data;
                document.getElementById("meaningError").style.display = "block";
            }
        });
}

function checkIfValid(userInput) {
    if (userInput > 50) {
        document.getElementById("userInput").style.borderColor = "#D9534F";
        document.getElementById("userInput").style.color = "#D9534F";
        document.getElementById("errorMessage").style.visibility = "visible";
        return 0;
    } else {
        return 1;
    }
}

function isValidJSON(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

function cleanUp() {
    document.getElementById("meaningError").style.display = "none";
    document.getElementById("term").style.display = "none";
    document.getElementById("userInput").style.borderColor = "black";
    document.getElementById("userInput").style.color = "black";
    document.getElementById("errorMessage").style.visibility = "hidden";
}

function lsButtonClick() {
    cleanUp();
    let x = document.getElementById("userInput").value;
    let isValid = checkIfValid(x);
    if (isValid) {
        document.getElementById("spinner").style.display = "block";
        calculateFibonacci(x);
    }
}

let term = document.getElementById('term');
let meaning = document.getElementById('meaning');
document.getElementById("getInputButton").addEventListener("click", lsButtonClick);