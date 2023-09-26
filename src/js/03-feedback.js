// Підключаємо бібліотеку lodash.throttle
import throttle from 'lodash.throttle';

// Отримуємо елементи форми та поля для вводу
const feedbackForm = document.querySelector('.feedback-form');
const emailInput = feedbackForm.querySelector('input[name="email"]');
const messageInput = feedbackForm.querySelector('textarea[name="message"]');

// Отримуємо об'єкт зі збереженими даними з локального сховища або створюємо порожній об'єкт
const storedFormData = JSON.parse(localStorage.getItem('feedback-form-state')) || {};

// Заповнюємо поля форми зі збереженими даними, якщо вони є
if (storedFormData.email) {
    emailInput.value = storedFormData.email;
}
if (storedFormData.message) {
    messageInput.value = storedFormData.message;
}

// Функція для збереження даних в локальне сховище з використанням throttle
const saveFormDataToLocalStorage = throttle(() => {
    const formData = {
        email: emailInput.value,
        message: messageInput.value,
    };
    localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}, 500); // Збереження не частіше, ніж раз на 500 мілісекунд

// Обробка події введення тексту у полях форми
emailInput.addEventListener('input', saveFormDataToLocalStorage);
messageInput.addEventListener('input', saveFormDataToLocalStorage);

// Обробка події відправки форми
feedbackForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    // Виведення даних у консоль та очищення сховища та поля форми
    const formData = {
        email: emailInput.value,
        message: messageInput.value,
    };
    console.log(formData);
    localStorage.removeItem('feedback-form-state');
    emailInput.value = '';
    messageInput.value = '';
});
