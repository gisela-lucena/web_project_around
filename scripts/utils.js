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

// Abrir popups
export const openImagePopup = (name, link) => {
  popupImageElement.src = link;
  popupImageElement.alt = name;
  popupCaptionElement.textContent = name;
  openPopup(popupImage);
};

profileEditButton.addEventListener("click", () => {
  openPopup(popup);
});

addCardButton.addEventListener("click", () => {
  openPopup(addCardsPopUp);
});

export function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupByEsc);
}

// Fechar popups

popupImageCloseButton.addEventListener("click", () => closePopup(popupImage));

popupCloseButton.addEventListener("click", () => closePopup(popup));

addCardsPopUpCloseButton.addEventListener("click", () =>
  closePopup(addCardsPopUp)
);

function closePopup(popupElement) {
  popupElement.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupByEsc);
}


// --- Perfil

export function handleProfileSubmit() {
  profileTitle.textContent = popupInputEditName.value;
  profileProfession.textContent = popupInputEditProfession.value;
  closePopup(popup);
}
popupForm.addEventListener("submit", (event) => {
  event.preventDefault();
  handleProfileSubmit();
});

// ---- Submit Add Card

export function handleAddCardSubmit() {
  const cardInstance = new Card(
    popupInputEditTitle.value,
    popupInputEditLink.value,
    "#initial_card"
  );
  const newCard = cardInstance.generateCard();
  cardsList.prepend(newCard);
  closePopup(addCardsPopUp);
}

addPlaceForm.addEventListener("submit", (event) => {
  event.preventDefault();
  handleAddCardSubmit();
  addPlaceForm.reset();
});
