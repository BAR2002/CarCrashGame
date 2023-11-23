let points = 0;

const canvas = document.getElementById('canvas');
const canvasMethod = canvas.getContext('2d');

const carImage = new Image();
carImage.src = 'car.png';

const truckImage = new Image();
truckImage.src = 'truck.png';

const bonusCoin = new Image();
bonusCoin.src = 'bonus.png';

const starImage = new Image();
starImage.src = 'fuel.png';

let carX = 100;
let carY = 250;
let truck1X = canvas.width;
let truck2X = canvas.width + 700;
let truck1Y = 160;
let truck2Y = 250;
let coinX = canvas.width;
let coinY = 100;
let isCarMoving = true;
let isCrashed = true;
let isCoinVisible = true;
let fuelX = Math.floor(Math.random() * canvas.width);
let fuelY = Math.floor(Math.random() * canvas.height);
const fuelWidth = 100;
const fuelHeight = 100;
let isFuelVisible = true;

document.addEventListener('keydown', function(event) {
    switch (event.code) {
        case 'ArrowUp':
        moveUp();
        break;
        case 'ArrowDown':
        moveDown();
        break;
        case 'ArrowLeft':
        moveLeft();
        break;
        case 'ArrowRight':
        moveRight();
        break;
    }
})

function restart() {
    window.location.reload();
}

function moveUp() {
    carY = carY - 20;
}

function moveDown() {
    carY = carY + 20;
}

function moveLeft() {
    carX = carX - 20;
}

function moveRight() {
    carX = carX + 20;
}

function draw(x, y, image, width, height) {
    canvasMethod.drawImage(image, x, y, width, height);
}

function drawRoad() {
    canvasMethod.fillStyle = "black";
    canvasMethod.fillRect(0, 0, canvas.width, canvas.height);

    canvasMethod.fillStyle = "white";

    for(let i = 0; i <= 4; i++) {
        let lineY = (canvas.height / 5) * i;
        canvasMethod.fillRect(0, lineY - 5, canvas.width, 5);
    }
}

function printScore() {
    canvasMethod.font = "20px Arial";
    canvasMethod.fillStyle = "white";
    canvasMethod.fillText('Score: ' + points, 20, 30);
}

function bonusCoinText() {
    canvasMethod.font = '20px Arial';
    canvasMethod.fillStyle = "White";
    canvasMethod.fillText('Coin: +5 points', 1100, 30);
}

function gameOver() {
    canvasMethod.font = "50px Arial";
    canvasMethod.fillStyle = "red";
    canvasMethod.fillText('YOU LOSE!', canvas.width / 2 - 150, canvas.height / 2 - 10)
}

function showFinalScore() {
    canvasMethod.font = "30px Arial";
    canvasMethod.fillStyle = "red";
    canvasMethod.fillText('Total Score: ' + points, canvas.width / 2 - 100, canvas.height / 2 + 40);
}

function startCar() {
    if (isCrashed) {
        canvasMethod.clearRect(0, 0, canvas.width, canvas.height);
        
        drawRoad();
        
        truck1X -= 2;
        if (truck1X < -150) {
            truck1X = canvas.width;
            truck1Y = Math.floor(Math.random() * 350);
            isCarMoving = true;
        }
        
        truck2X -= 2;
        if (truck2X < -150) {
            truck2X = canvas.width;
            truck2Y = Math.floor(Math.random() * 350);
            isCarMoving = true;
        }
        
        if (coinX < -150) {
            coinX = canvas.width;
            coinY = Math.floor(Math.random() * 400);
            isCarMoving = true;
        }
        
        checkCrash();
        checkfuel();
        draw(fuelX, fuelY, starImage, fuelWidth, fuelHeight);
        draw(truck1X, truck1Y, truckImage, 180, 130);
        draw(truck2X, truck2Y, truckImage, 180, 130);
        draw(carX, carY, carImage, 200, 150);
        printScore();
        bonusCoinText();
        
        coinX -= 3;
        if (isCoinVisible) {
            draw(coinX, coinY, bonusCoin, 100, 100);
        }
    }
}

function checkCrash() {
    if (carX + 150 > truck1X && carX < truck1X + 100 &&
        carY < truck1Y + 100 && carY + 80 > truck1Y) {
        isCrashed = false;
        gameOver();
        showFinalScore();
    }

    if (carX + 150 > truck2X && carX < truck2X + 100 &&
        carY < truck2Y + 100 && carY + 80 > truck2Y) {
        isCrashed = false;
        gameOver();
        showFinalScore();
    }

    if (carX > truck1X && carX < truck1X + 200 && isCarMoving) {
        points++;
        printScore();
        isCarMoving = false;
    }

    if (carX > truck2X && carX < truck2X + 200 && isCarMoving) {
        points++;
        printScore();
        isCarMoving = false;
    }

    if (carX + 150 > coinX && carX < coinX + 100 &&
        carY < coinY + 100 && carY + 80 > coinY && isCarMoving) {
        points += 5;
        printScore();
        isCoinVisible = false;
    }

    if (isCoinVisible === false) {
        coinX = canvas.width;
        coinY = Math.floor(Math.random() * 350);
        isCoinVisible = true;
    }
}

function checkfuel() {
    if (carX + 150 > fuelX && carX < fuelX + fuelWidth &&
        carY < fuelY + fuelHeight && carY + 80 > fuelY && isCarMoving) {
        points += 10;
        printScore();
        isFuelVisible = false;
    }

    if (isFuelVisible === false) {
        fuelX = Math.floor(Math.random() * canvas.width - 100);
        fuelY = Math.floor(Math.random() * canvas.height - 100);
        isFuelVisible = true;
    }
}

carImage.onload = function () {
    setInterval(startCar, 16);
}