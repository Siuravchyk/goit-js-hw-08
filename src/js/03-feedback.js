import throttle from 'lodash.throttle';

const LOCALSTORAGE_KEY = "feedback-form-state";

const form = document.querySelector('.feedback-form');
const emailInput = document.querySelector('input');
const messageInput = document.querySelector('textarea');


const storedData = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));

    if (storedData) {

        const { email, message } = storedData;
        emailInput.value = email;
        messageInput.value = message;

    } else { 

        emailInput.value = "";
        messageInput.value = "";
    }
    

const throttledSaveUserData = throttle(savedUserData, 500);

form.addEventListener("input", savedUserData);
form.addEventListener("submit", cleanedStorage);

function savedUserData(evt) {
    evt.preventDefault();

   const { email, message } = evt.currentTarget.elements;
    
        const info = {
            email: email.value,
            message: message.value
        }
        
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(info)); 
}

function cleanedStorage(evt) {
    

    const { email, message } = evt.currentTarget.elements;
    
      if (email.value === "" || message.value === "") {
          alert("Please fill in all the fields!");
          return;
        
      }
    
    const cleanedData = {
        email: email.value,
        message: message.value,
    }

        localStorage.removeItem(LOCALSTORAGE_KEY);
        console.log(cleanedData);
        evt.currentTarget.reset();            

}