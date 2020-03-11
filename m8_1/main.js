function getFibonacci(termNumber) {
    fetch("http://localhost:5050/fibonacci/" + termNumber)
        .then((resp) => resp.text())
        .then(function (data) {
            document.getElementById("isSpinner").style.display = "none";

            if (isValidJSON(data)) {
                const myJSON = JSON.parse(data);
                term.innerText = myJSON.result;
                document.getElementById("term").style.display = "block";
            } else {
                meaning.innerText = data;
                document.getElementById("meaningError").style.display = "block";
            }
        });
}

function calculateFibonacciOffline(termNumber) {
    let firstNum = 0;
    let secondNum = 1;
    let calculatedTerm;

    for (let i = 1; i < termNumber; i++) {
        calculatedTerm = firstNum + secondNum;
        firstNum = secondNum;
        secondNum = calculatedTerm;
    }

    term.innerText = calculatedTerm;
    document.getElementById("term").style.display = "block";
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
    const sortDropdown = document.getElementById('sortDropdown').value;
    const fibonacciResults = document.getElementById("fibonacciResults");

    while (fibonacciResults.firstChild) {
        fibonacciResults.removeChild(fibonacciResults.lastChild);
    }

    if (sortDropdown === "Number Asc") {
        results.sort((a, b) => a.number - b.number);
    } else if (sortDropdown === "Number Desc") {
        results.sort((a, b) => b.number - a.number);
    } else if (sortDropdown === "Date Asc") {
        results.sort((a, b) => new Date(a.createdDate) - new Date(b.createdDate));
    } else if (sortDropdown === "Date Desc") {
        results.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));
    }

    for (const r in results) {
        const number = `${results[r].number}`;
        const result = `${results[r].result}`;
        const createdDate = new Date(Number((`${results[r].createdDate}`)));

        const listRow = document.createElement('li');
        listRow.setAttribute("class", "list-group-item");

        const spanTextBeforeNumber = document.createElement("span");
        const spanNumberNode = document.createElement("span");
        spanNumberNode.setAttribute("class", "font-weight-bold");
        const spanTextBeforeResult = document.createElement("span");
        const spanResultNode = document.createElement("span");
        spanResultNode.setAttribute("class", "font-weight-bold");
        const spanTextBeforeDate = document.createElement("span");
        const spanDateNode = document.createElement("span");

        const textBeforeNumber = document.createTextNode("The Fibonacci Of ");
        const numberNode = document.createTextNode(number);
        const textBeforeResult = document.createTextNode(" is ");
        const resultNode = document.createTextNode(result);
        const textBeforeDate = document.createTextNode(". Calculated at: ");
        const dateNode = document.createTextNode(createdDate);

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
        return false;
    } else {
        return true;
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
    const saveCalcCheckbox = document.getElementById("saveCalcCheckbox").checked;
    const x = document.getElementById("userInput").value;

    if (checkIfValid(x) && saveCalcCheckbox) {
        document.getElementById("isSpinner").style.display = "block";
        getFibonacci(x);
        document.getElementById("resultsSpinner").style.display = "block";
        getFibonacciResults();
    } else if (checkIfValid(x) && !saveCalcCheckbox) {
        calculateFibonacciOffline(x);
    }
}

getFibonacciResults();
const term = document.getElementById('term');
const meaning = document.getElementById('meaning');
document.getElementById("getInputButton").addEventListener("click", lsButtonClick);