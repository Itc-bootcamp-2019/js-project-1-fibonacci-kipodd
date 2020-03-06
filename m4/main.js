function calculateFibonacci(index) {
    let firstNum = 0;
    let secondNum = 1;
    let result, i;

    for (i = 1; i < index; i++) {
        result = firstNum + secondNum;
        firstNum = secondNum;
        secondNum = result;
    }
    return result;
}

function changeToFibonacci() {
    let x = document.getElementById("user-input").value;
    document.getElementById('term').innerText = calculateFibonacci(x);
}

document.getElementById("get-input-button").addEventListener("click", changeToFibonacci);