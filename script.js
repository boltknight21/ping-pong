document.addEventListener("DOMContentLoaded", function () {
    const ball = document.getElementById("ball");
    const leftPaddle = document.getElementById("leftPaddle");
    const rightPaddle = document.getElementById("rightPaddle");
    const leftScoreDisplay = document.getElementById("leftScore");
    const rightScoreDisplay = document.getElementById("rightScore");

    let ballX = 300;
    let ballY = 200;
    let ballSpeedX = 5;
    let ballSpeedY = 5;

    let leftPaddleY = 160;
    let rightPaddleY = 160;

    let leftScore = 0;
    let rightScore = 0;

    function update() {
        ballX += ballSpeedX;
        ballY += ballSpeedY;

        // Check if the ball goes past the paddles
        if (ballX <= 0) {
            rightScore++;
            updateScoreDisplay();
            resetBall();
        } else if (ballX >= 580) {
            leftScore++;
            updateScoreDisplay();
            resetBall();
        }

        if (ballY <= 0 || ballY >= 380) {
            ballSpeedY = -ballSpeedY;
        }

        // Ball bouncing off paddles
        if (
            (ballX <= 10 && ballY >= leftPaddleY && ballY <= leftPaddleY + 80) ||
            (ballX >= 570 && ballY >= rightPaddleY && ballY <= rightPaddleY + 80)
        ) {
            ballSpeedX = -ballSpeedX;
        }

        // Update ball position
        ball.style.left = ballX + "px";
        ball.style.top = ballY + "px";

        // Update paddle positions
        leftPaddle.style.top = leftPaddleY + "px";
        rightPaddle.style.top = rightPaddleY + "px";
    }

    function resetBall() {
        ballX = 300;
        ballY = 200;
        ballSpeedX = -ballSpeedX; // Reverse direction
    }

    function updateScoreDisplay() {
        leftScoreDisplay.textContent = leftScore;
        rightScoreDisplay.textContent = rightScore;
    }

    function gameLoop() {
        update();
        requestAnimationFrame(gameLoop);
    }

    document.addEventListener("keydown", function (event) {
        // Move left paddle up
        if (event.key === "w" && leftPaddleY > 0) {
            leftPaddleY -= 10;
        }
        // Move left paddle down
        else if (event.key === "s" && leftPaddleY < 320) {
            leftPaddleY += 10;
        }

        // Move right paddle up
        if (event.key === "ArrowUp" && rightPaddleY > 0) {
            rightPaddleY -= 10;
        }
        // Move right paddle down
        else if (event.key === "ArrowDown" && rightPaddleY < 320) {
            rightPaddleY += 10;
        }
    });

    gameLoop();
});
