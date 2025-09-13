// ---- Funções de validação ----
const hideError = (input, errorMessage) => {
  input.classList.remove("popup__input_type_error");
  errorMessage.classList.remove("popup__error_visible");
};

const showError = (input, errorMessage) => {
  input.classList.add("popup__input_type_error");
  errorMessage.classList.add("popup__error_visible");
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

// ---- Eventos ----
// Perfil
profileEditButton.addEventListener("click", () => openPopup(popup));
popupCloseButton.addEventListener("click", () => closePopup(popup));
popupForm.addEventListener("submit", handleProfileSubmit);

// Add Card
addCardButton.addEventListener("click", () => openPopup(addCardsPopUp));
addCardsPopUpCloseButton.addEventListener("click", () =>
  closePopup(addCardsPopUp)
);
addPlaceForm.addEventListener("submit", handleAddCardSubmit);
enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});
