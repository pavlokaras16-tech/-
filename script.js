window.onload = function () {

    // ЕЛЕМЕНТИ
    const mars = document.getElementById("mars");
    const scoreText = document.getElementById("score");
    const gameArea = document.getElementById("game-area");
    const bgMusic = document.getElementById("bgMusic");
    bgMusic.volume = 0.3;
    document.body.addEventListener("click", function () {
        bgMusic.play();

}, { once: true });
    const timerText = document.getElementById("timer");
    const recordText = document.getElementById("record");
    const restartBtn = document.getElementById("restartBtn");

    // ЗМІННІ
    let score = 0;
    let timeLeft = 30;
    let gameActive = true;

    // РЕКОРД
    let record = localStorage.getItem("marsRecord") || 0;
    recordText.textContent = record;

    // РУХ МАРСА
    function moveMars() {

    const maxX = gameArea.offsetWidth - 80;
    const maxY = gameArea.offsetHeight - 80;

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    mars.style.left = randomX + "px";
    mars.style.top = randomY + "px";
}

    // КЛІК ПО МАРСУ
    mars.addEventListener("click", function () {

        if (!gameActive) return;

        // ЗВУК
        clickSound.currentTime = 0;
        clickSound.play();

        // ОЧКИ
        score++;
        scoreText.textContent = score;

        // НОВА ПОЗИЦІЯ
        moveMars();
    });

    // АВТОРУХ МАРСА
    const moveInterval = setInterval(function () {

        if (gameActive) {
            moveMars();
        }

    }, 1500);

    // ТАЙМЕР
    const timerInterval = setInterval(function () {

        if (!gameActive) return;

        timeLeft--;
        timerText.textContent = timeLeft;

        // КІНЕЦЬ ГРИ
        if (timeLeft <= 0) {

            gameActive = false;

            clearInterval(timerInterval);
            clearInterval(moveInterval);

            mars.style.display = "none";

            // НОВИЙ РЕКОРД
            if (score > record) {

                record = score;

                localStorage.setItem("marsRecord", record);

                recordText.textContent = record;
            }

            alert("🚀 Гру завершено!\nТвій результат: " + score);
        }

    }, 1000);

    // КНОПКА РЕСТАРТУ
    restartBtn.addEventListener("click", function () {

        location.reload();

    });

    // ПЕРШИЙ ЗАПУСК
    moveMars();
};