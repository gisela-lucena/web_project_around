export class Card {
  constructor(name, link, cardTemplateSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._cardTemplateSelector = cardTemplateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getCard() {
    return document
      .querySelector(this._cardTemplateSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._likeButton.classList.toggle("active");
    });

    this._deleteButton.addEventListener("click", () => {
      this._cardElement.remove();
    });

    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this);
    });
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

    this._setEventListeners();

    return this._cardElement;
  }
}
