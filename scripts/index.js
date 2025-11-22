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
import { api } from "./Api.js";

// ---- user info ----

const username = document.querySelector(".profile__title");
const about = document.querySelector(".profile__subtitle");
const avatar = document.querySelector(".profile__image");
const cardList = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#initial_card").content;
const cardElement = cardTemplate.querySelector(".card");
const usernameInput = document.querySelector(".popup__input_type_name");
const aboutInput = document.querySelector(".popup__input_type_about");
const form = document.querySelector(".popup__form");

api
  .getInitialData()
  .then(([userData, initialCards]) => {
    console.log(userData);
    console.log(initialCards);
    username.textContent = userData.name;
    about.textContent = userData.about;
    avatar.src = userData.avatar;

    initialCards.forEach((card) => {
      const newCard = cardElement.cloneNode(true);
      newCard.querySelector(".card__title").textContent = card.name;
      newCard.querySelector(".card__image").src = card.link;
      cardList.append(newCard);
    });
  })
  .catch((err) => {
    console.log(err);
  });

form.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const newUsername = usernameInput.value;
  const newAbout = aboutInput.value;

  api
    .setUserData({ name: newUsername, about: newAbout })
    .then((data) => {
      username.textContent = data.name;
      about.textContent = data.about;
    })
    .catch((err) => {
      console.log(err);
    });
});

const initialCards = document.querySelector("#initial_card").content;

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
