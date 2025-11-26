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
import { PopupWithConfirmation } from "./PopupWithConfirmation.js";

// ---- user info ----

const confirmationPopup = new PopupWithConfirmation("#confirm-popup", () => {
  // Lógica de confirmação aqui
});
confirmationPopup.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__subtitle",
  avatarSelector: ".profile__image",
});

api
  .getInitialData()
  .then(([userData, initialCards]) => {
    userInfo.setUserInfo({
      name: userData.name,
      job: userData.about,
      avatar: userData.avatar,
    });
    cardsList.renderItems(initialCards);
  })
  .catch((err) => {
    console.log(err);
  });

// ---- Adicionar novo card ----
const cardImagePopup = new PopupWithImage("#image-popup");

const cardsList = new Section(
  {
    renderer: (item) => {
      const cardInstance = new Card(
        item.name,
        item.link,
        item.isLiked,
        "#initial_card",
        () => {
          cardImagePopup.open({ name: item.name, link: item.link });
        },
        () => {
          confirmationPopup.open();
          confirmationPopup.setSubmitAction(() => {
            api
              .deleteCard(item._id)
              .then(() => {
                cardInstance.removeCard();
                confirmationPopup.close();
              })
              .catch((err) => {
                console.log(err);
              });
          });
        },
        () => {
          api
            .likeCard(item._id)
            .then((updatedCard) => {
              console.log("Card liked:", updatedCard);
            })
            .catch((err) => {
              console.log(err);
            });
        },
        () => {
          api
            .unlikeCard(item._id)
            .then((updatedCard) => {
              console.log("Card unliked:", updatedCard);
            })
            .catch((err) => {
              console.log(err);
            });
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

const avatarValidation = new FormValidator(
  {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button-disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__input-error",
  },
  document.querySelector("#edit-profile-avatar .popup__form")
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

// botão que abre o popup avatar
const avatarEditButton = document.querySelector(".profile__picture");
avatarEditButton.addEventListener("click", () => {
  avatarPopup.open();
});

// Cria a instância do popup imagem
const newCardPopup = new PopupWithForm("#add-card-popup", (formData) => {
  newCardPopup.renderLoading(true);
  api
    .addNewCard(formData.name, formData.link)
    .then((cardData) => {
      console.log(cardData);
      const cardInstance = new Card(
        cardData.name,
        cardData.link,
        cardData.isLiked,
        "#initial_card",
        () => {
          cardImagePopup.open({ name: cardData.name, link: cardData.link });
        },
        () => {
          confirmationPopup.open();
          confirmationPopup.setSubmitAction(() => {
            api
              .deleteCard(cardData._id)
              .then(() => {
                cardInstance.removeCard();
                confirmationPopup.close();
              })
              .catch((err) => {
                console.log(err);
              });
          });
        },
        () => {
          api
            .likeCard(cardData._id)
            .then((updatedCard) => {
              console.log("Card liked:", updatedCard);
            })
            .catch((err) => {
              console.log(err);
            });
        },
        () => {
          api
            .unlikeCard(cardData._id)
            .then((updatedCard) => {
              console.log("Card unliked:", updatedCard);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      );
      const newCard = cardInstance.generateCard();
      cardsList.addItem(newCard);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      newCardPopup.close();
      newCardPopup.renderLoading(false);
    });
});

const profileInfoPopup = new PopupWithForm(
  "#edit-popup-profile",
  (formData) => {
    const userInfo = new UserInfo({
      nameSelector: ".profile__title",
      jobSelector: ".profile__subtitle",
    });
    profileInfoPopup.renderLoading(true);
    api
      .setUserData(formData.name, formData.job)
      .then((data) => {
        console.log(data);
        userInfo.setUserInfo(formData);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        profileInfoPopup.close();
        profileInfoPopup.renderLoading(false);
      });
  }
);

const avatarPopup = new PopupWithForm("#edit-profile-avatar", (formData) => {
  avatarPopup.renderLoading(true);
  api
    .updateAvatar(formData.avatar)
    .then((data) => {
      console.log(data);
      userInfo.setUserAvatar(data.avatar);
      console.log("screenshot");
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      avatarPopup.close();
      avatarPopup.renderLoading(false);
    });
});

cardImagePopup.setEventListeners();
addCardValidation.enableValidation();
validationConfig.enableValidation();
newCardPopup.setEventListeners();
profileInfoPopup.setEventListeners();
avatarPopup.setEventListeners();
avatarValidation.enableValidation();
