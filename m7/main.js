function getFibonacci(termNumber) {
    fetch("http://localhost:5050/fibonacci/" + termNumber)
        .then((resp) => resp.text())
        .then(function (data) {
            document.getElementById("isSpinner").style.display = "none";

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

function getFibonacciResults() {
    fetch("http://localhost:5050/getFibonacciResults")
        .then((resp) => resp.json())
        .then(function (data) {
            document.getElementById("resultsSpinner").style.display = "none";
            createRecord(data.results);
        });
}

function createRecord(results) {
    let fibonacciResults = document.getElementById("fibonacciResults");
    
    for (const r in results) {
        const number = `${results[r].number}`;
        const result = `${results[r].result}`;
        const createdDate = new Date(Number((`${results[r].createdDate}`)));

        let listRow = document.createElement('li');
        listRow.setAttribute("class", "list-group-item");

        let spanTextBeforeNumber = document.createElement("span");
        let spanNumberNode = document.createElement("span");
        spanNumberNode.setAttribute("class", "font-weight-bold");
        let spanTextBeforeResult = document.createElement("span");
        let spanResultNode = document.createElement("span");
        spanResultNode.setAttribute("class", "font-weight-bold");
        let spanTextBeforeDate = document.createElement("span");
        let spanDateNode = document.createElement("span");

        let textBeforeNumber = document.createTextNode("The Fibonacci Of ");
        let numberNode = document.createTextNode(number);
        let textBeforeResult = document.createTextNode(" is ");
        let resultNode = document.createTextNode(result);
        let textBeforeDate = document.createTextNode(". Calculated at: ");
        let dateNode = document.createTextNode(createdDate);

        spanTextBeforeNumber.appendChild(textBeforeNumber);
        spanNumberNode.appendChild(numberNode);
        spanTextBeforeResult.appendChild(textBeforeResult);
        spanResultNode.appendChild(resultNode);
        spanTextBeforeDate.appendChild(textBeforeDate);
        spanDateNode.appendChild(dateNode);

        listRow.appendChild(spanTextBeforeNumber);
        listRow.appendChild(spanNumberNode);
        listRow.appendChild(spanTextBeforeResult);
        listRow.appendChild(spanResultNode);
        listRow.appendChild(spanTextBeforeDate);
        listRow.appendChild(spanDateNode);

        fibonacciResults.appendChild(listRow);
    }
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
    if (checkIfValid(x)) {
        document.getElementById("isSpinner").style.display = "block";
        getFibonacci(x);
        document.getElementById("resultsSpinner").style.display = "block";
        getFibonacciResults();
    }
}


getFibonacciResults();
let term = document.getElementById('term');
let meaning = document.getElementById('meaning');
document.getElementById("getInputButton").addEventListener("click", lsButtonClick);