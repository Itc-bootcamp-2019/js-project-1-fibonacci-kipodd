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

let index = 10;
let fibo = calculateFibonacci(index);
document.getElementById('x').innerText = String(index);
document.getElementById('y').innerText = fibo;