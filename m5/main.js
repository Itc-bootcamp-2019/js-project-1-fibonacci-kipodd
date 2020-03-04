function calculateFibonacci(index) {
    fetch("http://localhost:5050/fibonacci/" + index)
        .then((resp) => resp.json())
        .then(function (data) {
            result.innerText = data.result;
        });
}

function changeToFibonacci() {
    let x = document.getElementById("user-input").value;
    result.innerText = calculateFibonacci(x);
}

let result = document.getElementById('result');
document.getElementById("get-input-button").addEventListener("click", changeToFibonacci);