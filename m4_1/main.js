function calculateFibonacci(x) {
    if (x < 0) {
        return "Wrong Input";
    } else if (x == 0 | x == 1) {
        return x;
    } else {
        return calculateFibonacci(x - 1) + calculateFibonacci(x - 2);
    }
}

// 2
// 1, 0

function changeToFibonacci() {
    const x = document.getElementById("user-input").value;
    document.getElementById('result').innerText = calculateFibonacci(x);
}

document.getElementById("get-input-button").addEventListener("click", changeToFibonacci);