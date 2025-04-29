const day = document.getElementById("day");
const hrs = document.getElementById("hrs");
const min = document.getElementById("min");
const sec = document.getElementById("sec");

let totalSeconds = 6 * 24 * 60 * 60 + 14 * 60 * 60 + 38 * 60; // Начальное количество секунд

function updateCountdown() {
    let days = Math.floor(totalSeconds / (24 * 60 * 60));
    let hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
    let minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
    let seconds = totalSeconds % 60;

    day.innerHTML = days < 10 ? "0" + days : days;
    hrs.innerHTML = hours < 10 ? "0" + hours : hours;
    min.innerHTML = minutes < 10 ? "0" + minutes : minutes;
    sec.innerHTML = seconds < 10 ? "0" + seconds : seconds;

    if (totalSeconds <= 0) {
        // Счетчик достиг нуля
        clearInterval(intervalId); // Останавливаем интервал
        day.innerHTML = "00";
        hrs.innerHTML = "00";
        min.innerHTML = "00";
        sec.innerHTML = "00";
        // Здесь можно добавить код для выполнения каких-либо действий по окончании отсчета
    } else {
        totalSeconds--; // Уменьшаем общее количество секунд
    }
}

updateCountdown(); // Запускаем сразу, чтобы не было задержки
const intervalId = setInterval(updateCountdown, 1000); // Обновляем каждую секунду
