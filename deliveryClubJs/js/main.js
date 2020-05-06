const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");

cartButton.addEventListener("click", toggleModal);
close.addEventListener("click", toggleModal);

function toggleModal() {
    modal.classList.toggle("is-open");
}


// day 1

//Переменные
const buttonAuth = document.querySelector('.button-auth');
const modalAuth = document.querySelector('.modal-auth');
const closeAuth = document.querySelector('.close-auth');
const logIn = document.querySelector('#logInForm');
const loginInput = document.querySelector('#login');
const pwdInput = document.querySelector('#password');
const userName = document.querySelector('.user-name');
const buttonExit = document.querySelector('.button-out');
let login = localStorage.getItem('gloDelivery');

//Функция закрытия/открытия модального окна
function toggleModalAuth() {
    modalAuth.classList.toggle('is-open');
}


//Функция если пользователь авторизировался
function authorized() {
    function logOut() {
        login = '';
        localStorage.removeItem('gloDelivery');
        buttonAuth.style.display = '';
        userName.style.display = '';
        buttonExit.style.display = '';
        buttonExit.removeEventListener("click", logOut);
        checkAuth();
    }

    userName.textContent = login;
    buttonAuth.style.display = 'none';
    userName.style.display = 'inline';
    buttonExit.style.display = 'block';

    buttonExit.addEventListener("click", logOut);
    closeAuth.addEventListener("click", toggleModalAuth);
}

//Эта функция вызывается, если пользователь не авторизирован
function nonAuthorized() {

//Функция для отключения перезагрузки страницы и после введения данных закрывает модальное окно
    function logInForm(event) {
        event.preventDefault();
        buttonAuth.removeEventListener("click", toggleModalAuth);
        closeAuth.removeEventListener("click", toggleModalAuth);
        logIn.removeEventListener("submit", logInForm);
        toggleModalAuth();
        checkAuth();
    }

    logIn.addEventListener('submit', function (event) {
        event.preventDefault();
        if (loginInput.value !== '') {
            login = loginInput.value;
            localStorage.setItem('gloDelivery', login);
            logIn.addEventListener("submit", logInForm);
        } else {
            alert("Поле логина должно быть заполнено!");
        }
    });
    logIn.reset();
    buttonAuth.addEventListener("click", toggleModalAuth);
    closeAuth.addEventListener("click", toggleModalAuth);
}

//Функция проверки авторизации пользователя
function checkAuth() {
    if (login) {
        authorized();
    } else {
        nonAuthorized();
    }
}

checkAuth();