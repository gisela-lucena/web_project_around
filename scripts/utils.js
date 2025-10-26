// Importando a classe Card
import { Card } from "./Card.js";
export const popupForm = document.querySelector(".popup__form");
export const addPlaceForm = document.getElementById("add-card-form");
export const cardsList = document.querySelector(".cards");
const profileEditButton = document.querySelector(".profile__edit-button");
const popup = document.querySelector(".popup");
const popupCloseButton = document.querySelector(".popup__close");
const popupInputEditName = document.querySelector(".popup__input_edit_name");
const popupInputEditProfession = document.querySelector(
  ".popup__input_edit_profession"
);
const profileTitle = document.querySelector(".profile__title");
const profileProfession = document.querySelector(".profile__subtitle");
const addCardButton = document.querySelector(".profile__add-place");
const addCardsPopUp = document.getElementById("add-card-popup");
const addCardsPopUpCloseButton = document.getElementById("close-add-card");
const popupInputEditTitle = document.querySelector(".popup__input_edit_title");
const popupInputEditLink = document.querySelector(".popup__input_edit_link");
const popupImage = document.getElementById("image-popup");
const popupImageCloseButton = popupImage.querySelector(".popup__close");
const popupImageElement = document.querySelector(".popup__image");
const popupCaptionElement = document.querySelector(".popup__image-caption");

const formValidation = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
