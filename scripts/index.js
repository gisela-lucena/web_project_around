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
const addButton = document.querySelector(".popup__button"); // botão salvar perfil
const buttonAddPlace = document.querySelector(".popup__button-addplace"); // botão adicionar card

const cardTemplate = document
  .getElementById("initial_card")
  .content.querySelector(".card");

// ---- Funções de Cards ----
function prependCard(data) {
  const cardElement = cardTemplate.cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-icon");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  // Like
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("active");
  });

  // Abrir imagem em popup
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

  // Remover card
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
    name: "Parque Nacional da Vanoise ",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

initialCards.forEach((card) => renderCard(card, cardsList));

// ---- Abrir/fechar popups ----
profileEditButton.addEventListener("click", () => {
  popup.style.display = "flex";
});

popupCloseButton.addEventListener("click", () => {
  popup.style.display = "none";
});

addCardButton.addEventListener("click", () => {
  addCardsPopUp.style.display = "flex";
});

addCardsPopUpCloseButton.addEventListener("click", () => {
  addCardsPopUp.style.display = "none";
});

// ---- Atualizar perfil ----
popupForm.addEventListener("submit", (event) => {
  event.preventDefault();
  profileTitle.textContent = popupInputEditName.value;
  profileProfession.textContent = popupInputEditProfession.value;
  popup.style.display = "none";
  popupInputEditName.value = "";
  popupInputEditProfession.value = "";
  setSubmitButtonState(addButton, false);
});

// ---- Adicionar novo card ----
addPlaceForm.addEventListener("submit", (event) => {
  event.preventDefault();
  renderCard(
    { name: popupInputEditTitle.value, link: popupInputEditLink.value },
    cardsList
  );
  addCardsPopUp.style.display = "none";
  popupInputEditTitle.value = "";
  popupInputEditLink.value = "";
  setSubmitButtonState(buttonAddPlace, false);
});

// ---- Funções de validação ----
const hideError = (input, errorMessage) => {
  input.classList.remove("popup__input_type_error");
  errorMessage.classList.remove("popup__input-error_visible");
};

const showError = (input, errorMessage) => {
  input.classList.add("popup__input_type_error");
  errorMessage.classList.add("popup__input-error_visible");
  errorMessage.textContent = input.validationMessage;
};

function checkInputValidity(input) {
  const formIsValid = input.validity.valid;
  const errorMessage = input.nextElementSibling;

  if (formIsValid) {
    hideError(input, errorMessage);
  } else {
    showError(input, errorMessage);
  }
}

// ---- Função genérica para botões ----
function setSubmitButtonState(button, isFormValid) {
  if (isFormValid) {
    button.removeAttribute("disabled");
    button.classList.remove("popup__button-disabled");
  } else {
    button.setAttribute("disabled", true);
    button.classList.add("popup__button-disabled");
  }
}

// ---- Validação Editar Perfil ----
popupForm.addEventListener("input", () => {
  checkInputValidity(popupInputEditName);
  checkInputValidity(popupInputEditProfession);

  const isValid =
    popupInputEditName.validity.valid &&
    popupInputEditProfession.validity.valid;

  setSubmitButtonState(addButton, isValid);
});

// ---- Validação Adicionar Card ----
addPlaceForm.addEventListener("input", () => {
  checkInputValidity(popupInputEditTitle);
  checkInputValidity(popupInputEditLink);

  const formIsValid =
    popupInputEditTitle.validity.valid && popupInputEditLink.validity.valid;

  setSubmitButtonState(buttonAddPlace, formIsValid);
});

// ---- Estado inicial dos botões ----
setSubmitButtonState(addButton, false);
setSubmitButtonState(buttonAddPlace, false);

// ---- Fechar popup com ESC ----

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    const openPopup = document.querySelector(".popup[style*='display: flex']");
    if (openPopup) {
      openPopup.style.display = "none";
    }
  }
});

// ---- Fechar popup clicando fora ----
document.addEventListener("click", (event) => {
  const openPopup = document.querySelector(".popup[style*='display: flex']");
  if (openPopup && event.target === openPopup) {
    openPopup.style.display = "none";
  }
});
