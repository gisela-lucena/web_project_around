// ---- Importações ----
import { openImagePopup } from "./utils.js";
// ---- Funções de Cards ----
export class Card {
  constructor(name, link, cardTemplateSelector) {
    this._name = name;
    this._link = link;
    this._cardTemplateSelector = cardTemplateSelector;
  }

  _getCard() {
    const cardElement = document
      .querySelector(this._cardTemplateSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners(cardElement) {
    const likeButton = cardElement.querySelector(".card__like-icon");
    const deleteButton = cardElement.querySelector(".card__delete-icon");
    const cardImage = cardElement.querySelector(".card__image");

    likeButton.addEventListener("click", () => {
      this._handleCardLike();
    });

    deleteButton.addEventListener("click", () => {
      this._handleCardDeletion();
    });

    cardImage.addEventListener("click", () => {
      openImagePopup(this._name, this._link);
    });
  }
  _handleCardLike() {
    this._likeButton.classList.toggle("active");
  }

  _handleCardDeletion() {
    this._cardElement.remove();
  }
  _handleCardClick() {
    this._handleCardClick();
  }

  generateCard() {
    this._cardElement = this._getCard();

    this._cardTitle = this._cardElement.querySelector(".card__title");
    this._cardTitle.textContent = this._name;

    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    this._likeButton = this._cardElement.querySelector(".card__like-icon");
    this._deleteButton = this._cardElement.querySelector(".card__delete-icon");
    this._setEventListeners(this._cardElement);

    return this._cardElement;
  }
}
