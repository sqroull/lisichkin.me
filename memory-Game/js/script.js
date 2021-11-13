// Карты
const cardList = document.getElementById("cardList");
let card = document.getElementsByClassName("card");
let cards = [...card];
const matchedCard = document.getElementsByClassName("matched");
// Копия массива, из которой будем брать карты при смене поля
const initialCards = cards.concat();
// Модальное окно
const modal = document.getElementById("modal");
const closeIcon = document.querySelector(".modal__close");
const endGameTitle = document.getElementById("modalTitle");
// Статистика
const flips = document.getElementById("flips");
const timeLeft = document.getElementById("timeLeft");
const counter = document.querySelector(".stats__counter");
const restart = document.getElementById("restartBtn");
let timer = document.querySelector(".stats__secs");
let second = 60;
let moves = 0;
let interval;
let openedCards = [];
// Диапозон поля
const rangeCount = document.getElementById("rangeCount");
const rangeInput = document.getElementById("rangeInput");
const inputNumbers = document.getElementsByClassName("stats-field__value");

// По умолчанию делаем поле 4 на 4
cards.splice(16, 100);

// Запускаем игру
document.body.onload = startGame();

// Новая игра
function startGame(){
    openedCards = [];

    // Перемешиваем
    cards = shuffle(cards);
    cardList.innerHTML = "";

    // Удаляем все классы у карт с прошлой игры, добавляем в колоду
    for (let i = 0; i < cards.length; i++){
        Array.prototype.forEach.call(cards, function(item) {
            cardList.appendChild(item);
        });
        cards[i].classList.remove("showed", "opened", "matched", "blocked");   
    }

    // Обновляем счётчики
    moves = 0;
    counter.innerHTML = moves;
    timer.innerHTML = second + " секунд";
    clearInterval(interval);
}

// Перемешиваем карты
function shuffle(array) {
    let currentIndex = array.length;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
};

// Добавляем классы при октрытии
function displayCard(){
    this.classList.add("opened");
    this.classList.add("showed");
    this.classList.add("blocked");
};


// Сравниваем две открытые карты и разбираем на разные или совпадение
function openCard() {
    openedCards.push(this);
    let openLength = openedCards.length;

    if(openLength === 2) {
        moveCounter();
        if(openedCards[0].dataset.value === openedCards[1].dataset.value){
            matched();
        } else {
            unmatched();
        }
    }
};

// Считаем ходы и начинаем таймер после первой пары
function moveCounter(){
    moves++;
    counter.innerHTML = moves;
    if(moves == 1){
        startTimer();
    }
}

// Стили для отрытых подходящих карт
function matched(){
    openedCards[0].classList.add("matched", "blocked");
    openedCards[1].classList.add("matched", "blocked");
    openedCards[0].classList.remove("showed", "opened");
    openedCards[1].classList.remove("showed", "opened");
    openedCards = [];
}


// Стили для отрытых разных карт
function unmatched(){
    disable();
    openedCards[0].classList.add("unmatched");
    openedCards[1].classList.add("unmatched");
    setTimeout(function(){
        openedCards[0].classList.remove("showed", "opened","unmatched");
        openedCards[1].classList.remove("showed", "opened","unmatched");
        enable();
        openedCards = [];
    }, 700);
}

// Пока две открытые несовпадающие карты проигрывают анимацию ошибки,
// мы не можем открывать следующие
function disable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.add('blocked');
    });
}

// Делаем карты снова кликабельными, но не открытые пары
function enable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.remove('blocked');
        for(let i = 0; i < matchedCard.length; i++){
            matchedCard[i].classList.add("blocked");
        }
    });
}

// Таймер
function startTimer(){
    interval = setInterval(function(){
        timer.innerHTML = second + " секунд";
        second--;
        if(second == -1){
            gameOver();
        }
    },1000);
}

// В случае выигрыша вызываем модальное с поздравлениями
// (количество совпавших равно количеству всех карт)
function congratulations(){
    if (matchedCard.length == cards.length) {
        showModal();
        endGameTitle.innerHTML = "Поздравляем!";
    };
}

// В случае проигрыша вызываем модальное не с поздравлениями
function gameOver(){
    showModal();
    endGameTitle.innerHTML = "Вы проиграли :(";
    timeLeft.style.display = "none";
}

// Модальное в конце игры
function showModal() {
    clearInterval(interval);
    // показываем время и количество открытых пар
    flips.innerHTML = moves;
    finalTime = timer.innerHTML;
    document.getElementById("timeTotal").innerHTML = finalTime;
    modal.classList.add("showed");
    // делаем диапозон поля ярче, чтобы игрок мог сразу выбрать другое поле
    inputNumbers[0].style.color = "#fff";
    inputNumbers[1].style.color = "#fff";
    rangeInput.style.backgroundColor = "#fff";
    // Ставим обработчик закрытия
    closeModal();
}

// Обработчик на крестик, при закрытии модального
function closeModal(){
    closeIcon.addEventListener("click", function(e){
        changeColor();
    });
}

// Меняем цвета при закрытии окна
function changeColor() {
    modal.classList.remove("showed");
    inputNumbers[0].style.color = "#000";
    inputNumbers[1].style.color = "#000";
    rangeInput.style.backgroundColor = "#000";
}

// До начала новой игры берём все карты и следим за выбранным числом в диапозоне,
// далее настраиваем поле, время и стили, добавляем обработчики на карты
// и вызываем с этими параметрами запуск
function restartGame(){
    cards = initialCards.concat();
    let value = rangeInput.value;
    if (value == 2) {
        second = 10;
        cards.splice(4, 100);
        cards.forEach((element) => {
            element.classList.add("card--2"); 
            element.classList.remove("card--6", "card--8", "card--10");            
        })
    } else if (value == 6) {
        second = 90;
        cards.splice(36, 100);
        cards.forEach((element) => {
            element.classList.add("card--6");
            element.classList.remove("card--2", "card--8", "card--10"); 
            listenCards();       
        })
    } else if (value == 8) {
        second = 180;
        cards.splice(64, 100);
        cards.forEach((element) => {
            element.classList.add("card--8"); 
            element.classList.remove("card--2", "card--6", "card--10");   
            listenCards();             
        })
    } else if (value == 10) {
        second = 360;
        cards;
        cards.forEach((element) => {
            element.classList.add("card--10"); 
            element.classList.remove("card--2", "card--6", "card--8"); 
            listenCards();               
        })
    } else {
        second = 60;
        cards.splice(16, 100);
        cards.forEach((element) => {
            element.classList.remove("card--2", "card--6", "card--8", "card--10");            
        })
    }
    startGame();
};

// Обработчики на карты
function listenCards(){
    for (let i = 0; i < cards.length; i++){
        card = cards[i];
        card.addEventListener("click", displayCard);
        card.addEventListener("click", openCard);
        card.addEventListener("click", congratulations);
    };
};
listenCards();


// Обработчик кнопки Начать заново (из модального окна)
function startAgain(){
    changeColor();
    restartGame();
}

// Меняем эффект при выборе количества строк/столбцов
rangeInput.oninput = (()=>{
    let value = rangeInput.value;
    rangeCount.textContent = value;
    rangeCount.style.left = (value * 9.62) + "%";
    rangeCount.classList.add("scale-1");
});
rangeInput.onblur = (()=>{
    rangeCount.classList.remove("scale-1");
});

// Обработчик кнопки START
restart.addEventListener('click', restartGame);