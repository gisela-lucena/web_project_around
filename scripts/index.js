// ---- Importações ----
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import {
  handleProfileSubmit,
  handleAddCardSubmit,
  popupForm,
  addPlaceForm,
  cardsList,
} from "./utils.js";
// ---- Seletores ----

// ---- Cards iniciais ----
const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional da Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

// ---- Adicionar novo card ----

initialCards.forEach((card) => {
  const cardInstance = new Card(card.name, card.link, "#initial_card");

  const newCard = cardInstance.generateCard();

  cardsList.prepend(newCard);
});

// ---- Instanciar Card & Form Validator ----

const validationConfig = new FormValidator(
  {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button-disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
  },
  popupForm,
  handleProfileSubmit
);
validationConfig.enableValidation();

const addCardValidation = new FormValidator(
  {
    formSelector: ".add-card-form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button-addplace",
    inactiveButtonClass: "popup__button-disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__input-error",
  },
  addPlaceForm,
  handleAddCardSubmit
);
addCardValidation.enableValidation();
