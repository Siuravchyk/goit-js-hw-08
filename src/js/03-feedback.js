const form = document.querySelector('.feedback-form');
const emailInput = document.querySelector('input');
const messageInput = document.querySelector('textarea');

const LOCALSTORAGE_KEY = "feedback-form-state";

const storedData = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)) || { email: "", message: "" };

emailInput.value = storedData.email;
messageInput.value = storedData.message;

const throttledSaveUserData = throttle(savedUserData, 500);

form.addEventListener("input", throttledSaveUserData);
form.addEventListener("submit", cleanedStorage);

function savedUserData(evt) {
    const { email, message } = evt.currentTarget.elements;
    const info = {
        email: email.value,
        message: message.value
    };

    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(info));
}

function cleanedStorage(evt) {
    const { email, message } = evt.currentTarget.elements;

    if (email.value === "" || message.value === "") {
        alert("Please fill in all the fields!");
        evt.preventDefault();
        return;
    }

    localStorage.removeItem(LOCALSTORAGE_KEY);
    console.log("Data cleaned from LocalStorage");
    
    evt.currentTarget.reset();
}
