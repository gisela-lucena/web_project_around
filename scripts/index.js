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

// ---- Funções genéricas para popups ----
function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupByEsc);
}

function closePopup(popupElement) {
  popupElement.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupByEsc);
}

function closePopupByEsc(event) {
  if (event.key === "Escape") {
    const openPopupElement = document.querySelector(".popup.popup_opened");
    if (openPopupElement) {
      closePopup(openPopupElement);
    }
  }
}

// Fechar clicando fora do popup
document.querySelectorAll(".popup").forEach((popupElement) => {
  popupElement.addEventListener("mousedown", (event) => {
    if (event.target === popupElement) {
      closePopup(popupElement);
    }
  });
});

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
    const popupImageElement = document.querySelector(".popup__image");
    const popupCaptionElement = document.querySelector(".popup__image-caption");

    popupImageElement.src = data.link;
    popupImageElement.alt = data.name;
    popupCaptionElement.textContent = data.name;

    openPopup(popupImage);
  });

  // Fechar imagem
  popupImageCloseButton.addEventListener("click", () => closePopup(popupImage));

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
    name: "Parque Nacional da Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

initialCards.forEach((card) => renderCard(card, cardsList));

// ---- Atualizar perfil ----
function handleProfileSubmit(event) {
  event.preventDefault();
  profileTitle.textContent = popupInputEditName.value;
  profileProfession.textContent = popupInputEditProfession.value;
  closePopup(popup);
  popupForm.reset();
  setSubmitButtonState(addButton, false);
}

// ---- Adicionar novo card ----
function handleAddCardSubmit(event) {
  event.preventDefault();
  renderCard(
    { name: popupInputEditTitle.value, link: popupInputEditLink.value },
    cardsList
  );
  closePopup(addCardsPopUp);
  addPlaceForm.reset();
  setSubmitButtonState(buttonAddPlace, false);
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
