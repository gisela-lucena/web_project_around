const profileEditButton = document.querySelector(".profile__edit-button");
const popup = document.querySelector(".popup");
const popupCloseButton = document.querySelector(".popup__close");
const popupForm = document.querySelector(".popup__form");
const popupInputEditName = document.querySelector(".popup__input_edit_name");
const popupInputEditProfession = document.querySelector(
  ".popup__input_edit_profession"
);
const profileTitle = document.querySelector(".profile__title");
const profileProfession = document.querySelector(".profile__subtitle");
const addCardButton = document.querySelector(".profile__add-place");
const addCardsPopUp = document.getElementById("add-card-popup");
const addCardsPopUpCloseButton = document.getElementById("close-add-card");
const addPlaceForm = document.getElementById("add-card-form");
const popupInputEditTitle = document.querySelector(".popup__input_edit_title");
const popupInputEditLink = document.querySelector(".popup__input_edit_link");

const popupImage = document.getElementById("image-popup");

const cardsList = document.querySelector(".cards");

const cardTemplate = document
  .getElementById("initial_card")
  .content.querySelector(".card");

function createCard(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-icon");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("active");
  });

  cardImage.addEventListener("click", () => {
    popupImage.style.display = "flex";

    const popupImageElement = document.querySelector(".popup__image");
    const popupCaptionElement = document.querySelector(".popup__image-caption");
    popupImageElement.src = data.link;
    popupImageElement.alt = data.name;
    popupCaptionElement.textContent = data.name;
  });

  cardElement
    .querySelector(".card__delete-icon")
    .addEventListener("click", (event) => {
      event.target.closest(".card").remove();
    });

  return cardElement;
}

function renderCard(data, container) {
  container.prepend(createCard(data));
}

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
    name: "Parque Nacional da Vanoise ",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

profileEditButton.addEventListener("click", () => {
  popup.style.display = "flex";
});

popupCloseButton.addEventListener("click", () => {
  popup.style.display = "none";
});

popupForm.addEventListener("submit", (event) => {
  event.preventDefault();
  profileTitle.textContent = popupInputEditName.value;
  profileProfession.textContent = popupInputEditProfession.value;
  popup.style.display = "none";
});

addCardButton.addEventListener("click", () => {
  addCardsPopUp.style.display = "flex";
});

addCardsPopUpCloseButton.addEventListener("click", () => {
  addCardsPopUp.style.display = "none";
});

addPlaceForm.addEventListener("submit", (event) => {
  event.preventDefault();
  renderCard(
    {
      name: popupInputEditTitle.value,
      link: popupInputEditLink.value,
    },
    cardsList
  );
  addCardsPopUp.style.display = "none";
});

initialCards.forEach((card) => {
  renderCard(card, cardsList);
});
