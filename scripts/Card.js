export class Card {
  constructor(
    name,
    link,
    isLiked,
    cardTemplateSelector,
    handleCardClick,
    handleDeleteClick,
    handleLikeClick,
    handleUnlikeClick
  ) {
    this._name = name;
    this._link = link;
    this._isLiked = isLiked;
    this._cardTemplateSelector = cardTemplateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._handleUnlikeClick = handleUnlikeClick;
  }

  _getCard() {
    return document
      .querySelector(this._cardTemplateSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      if (this._isLiked) {
        this._handleUnlikeClick(this);
        this._likeButton.classList.remove("active");
      } else {
        this._handleLikeClick(this);
        this._likeButton.classList.add("active");
      }
      this._isLiked = !this._isLiked;
    });

    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteClick(this);
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
    if (this._isLiked) {
      this._likeButton.classList.add("active");
    }
    this._deleteButton = this._cardElement.querySelector(".card__delete-icon");

    this._setEventListeners();

    return this._cardElement;
  }

  removeCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }
}
