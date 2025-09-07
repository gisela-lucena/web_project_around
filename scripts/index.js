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
const popupImageCloseButton = popupImage.querySelector(".popup__close");
const cardsList = document.querySelector(".cards");

const addButton = document.querySelector(".popup__button");

const formInput = document.querySelectorAll(".popup__input");
const formError = document.querySelectorAll(".popup__input-error");

const cardTemplate = document
  .getElementById("initial_card")
  .content.querySelector(".card");

function prependCard(data) {
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector(".card");

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

    popupImageCloseButton.addEventListener("click", () => {
      popupImage.style.display = "none";
    });

    const popupImageElement = document.querySelector(".popup__image");
    const popupCaptionElement = document.querySelector(".popup__image-caption");
    popupImageElement.src = data.link;
    popupImageElement.alt = data.name;
    popupCaptionElement.textContent = data.name;
  });

  cardElement
    .querySelector(".card__delete-icon")
    .addEventListener("click", () => {
      cardElement.closest(".card").remove();
    });

  return cardElement;
}

function renderCard(data, container) {
  container.prepend(prependCard(data));
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

function setSubmitButtonState(isFormValid) {
  if (isFormValid) {
    addButton.removeAttribute("disabled");
    addButton.classList.remove("popup__button-disabled");
  } else {
    addButton.setAttribute("disabled", true);
    addButton.classList.add("popup__button-disabled");
  }
}

popupForm.addEventListener("submit", (event) => {
  event.preventDefault();
  profileTitle.textContent = popupInputEditName.value;
  profileProfession.textContent = popupInputEditProfession.value;
  popup.style.display = "none";
  popupInputEditName.value = "";
  popupInputEditProfession.value = "";
  setSubmitButtonState(false);
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
  popupInputEditTitle.value = "";
  popupInputEditLink.value = "";
});

initialCards.forEach((card) => {
  renderCard(card, cardsList);
});

popupForm.addEventListener("input", function (evt) {
  const isValid =
    popupInputEditName.value.length > 0 &&
    popupInputEditProfession.value.length > 0;
  setSubmitButtonState(isValid);
});

const showError = (input, errorMessage) => {
  input.classList.add("form__input_type_error");
  errorMessage.classList.add("form__input-error_visible");
};

const hideError = (input, errorMessage) => {
  input.classList.remove("form__input_type_error");
  errorMessage.classList.remove("form__input-error_visible");
};

const inputList = document.querySelectorAll(".popup__input");
function checkInputValidity(input) {
  const formIsValid = input.validity.valid;
  const errorMessage = input.nextElementSibling;

  if (formIsValid) {
    hideError(input, errorMessage);
  } else {
    showError(input, errorMessage);
  }
}
inputList.forEach((input) => {
  input.addEventListener("input", () => {
    checkInputValidity(input);
  });
});
