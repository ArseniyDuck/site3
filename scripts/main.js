// Global
const aside = document.querySelector("#side-container");
const burger = document.querySelector("#navbar__burger");



// Notification
const availableToNotificate = ["chats", "inbox"];



// Burger
burger.onclick = function() {
    burger.classList.toggle("active");
    aside.classList.toggle("active");
};



// Search form
const searchForm  = document.querySelector("#search-form"),
      searchInput = document.querySelector("#input-wrapper__input");

addShadowWithFocus(searchForm, searchInput);

searchInput.oninput = function() {
    let value = this.value.trim();
    let usernames = document.querySelectorAll(".users-container__username");

    if (value != "") {
        usernames.forEach(function(elem) {
            if (elem.innerHTML.toLowerCase().search(value.toLowerCase()) == -1) {
                elem.parentElement.parentElement.classList.add("hidden");
            } else {
                elem.parentElement.parentElement.classList.remove("hidden");
            }
        });
    } else {
        usernames.forEach(function(elem) {
            elem.parentElement.parentElement.classList.remove("hidden");
        });
    }
};



// Navigation
const blocksArray  = [...document.querySelectorAll(".side-container__component")],
      buttonsArray = [...document.querySelectorAll(".navbar__button")];

buttonsArray.forEach((elem, index) => {
    elem.onclick = () => {
        for (let i = 0; i < blocksArray.length; i++) {
            if (i == index) {
                if (![...aside.classList].includes("active")) {
                    aside.classList.add("active");
                    burger.classList.add("active");
                }

                buttonsArray[i].classList.add("active");
                blocksArray[i].classList.add("active");
            } else {
                buttonsArray[i].classList.remove("active");
                blocksArray[i].classList.remove("active");
            }
        }
    };
});



// Message form
const messageForm  = document.querySelector("#chat__form"),
      messageInput = document.querySelector("#chat__input");

addShadowWithFocus(messageForm, messageInput);



// Functions
function addShadowWithFocus(form, input) {
    input.addEventListener("focus", function(e) {
        form.classList.add("form-shadow");
    });

    input.addEventListener("blur", function(e) {
        form.classList.remove("form-shadow");
    });

    form.onsubmit = (e) => {
        e.preventDefault();
    };
}

function addNotification(str) {
    if (availableToNotificate.includes(str)) {
        if (!document.querySelector(`#${str}-icon span.notification`)) {
            const span = document.createElement("span");
            span.setAttribute("class", "notification");
            document.getElementById(str + "-icon").appendChild(span);
        } else {
            console.error(`${str} already has notification!`);
        } return;
    } console.error("Wrong argument!");
}

function deleteNotification(str) {
    if (availableToNotificate.includes(str)) {
        const span = document.querySelector(`#${str}-icon span.notification`);
        if (span) {
            span.remove();
        } else {
            console.error("Can't find notification to delete...");
        } return;
    } console.error("Wrong argument!");
}
