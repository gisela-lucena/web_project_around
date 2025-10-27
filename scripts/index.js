// ---- Importações ----
import { PopupWithForm } from "./PopupWithForm.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { Popup } from "./Popup.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { popupForm, addPlaceForm } from "./utils.js";
import { Section } from "./Section.js";
import { UserInfo } from "./UserInfo.js";
import { formValidation } from "./utils.js";

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
const cardImagePopup = new PopupWithImage("#image-popup");

const cardsList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardInstance = new Card(
        item.name,
        item.link,
        "#initial_card",
        () => {
          cardImagePopup.open({ name: item.name, link: item.link });
        }
      );
      const newCard = cardInstance.generateCard();
      cardsList.addItem(newCard);
    },
  },
  ".cards"
);

// ---- Instanciar Card & Form Validator ----

const validationConfig = new FormValidator(formValidation, popupForm);

const addCardValidation = new FormValidator(
  {
    formSelector: ".add-card-form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button-addplace",
    inactiveButtonClass: "popup__button-disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__input-error",
  },
  addPlaceForm
);

// Cria a instância do popup
const popup = new Popup("#edit-popup-profile");
popup.setEventListeners();

// Botão que abre o popup
const openButton = document.querySelector(".profile__edit-button");
openButton.addEventListener("click", () => {
  popup.open();
});

// Cria a instância do popup cartao
const addCardsPopUpopup = new Popup("#add-card-popup");
addCardsPopUpopup.setEventListeners();

// Botão que abre o popup
const addCardButton = document.querySelector(".profile__add-place");
addCardButton.addEventListener("click", () => {
  addCardsPopUpopup.open();
});

// Cria a instância do popup imagem
const newCardPopup = new PopupWithForm("#add-card-popup", (formData) => {
  const cardInstance = new Card(formData.name, formData.link, "#initial_card");

  const newCard = cardInstance.generateCard();
  cardsList.addItem(newCard);

  newCardPopup.close();
});

const profileInfoPopup = new PopupWithForm(
  "#edit-popup-profile",
  (formData) => {
    const userInfo = new UserInfo({
      nameSelector: ".profile__title",
      jobSelector: ".profile__subtitle",
    });

    userInfo.setUserInfo(formData);
    profileInfoPopup.close();
  }
);

cardImagePopup.setEventListeners();
addCardValidation.enableValidation();
validationConfig.enableValidation();
newCardPopup.setEventListeners();
profileInfoPopup.setEventListeners();
cardsList.renderItems();
