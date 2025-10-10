// ---- Função principal de validação ----
export class FormValidator {
  constructor(
    {
      formSelector,
      inputSelector,
      submitButtonSelector,
      inactiveButtonClass,
      inputErrorClass,
      errorClass,
    },
    formElement,
    handleFormSubmit
  ) {
    this._formElement = formElement;
    this._formSelector = formSelector;
    this._inputSelector = inputSelector;
    this._submitButtonSelector = submitButtonSelector;
    this._inactiveButtonClass = inactiveButtonClass;
    this._inputErrorClass = inputErrorClass;
    this._errorClass = errorClass;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    this._buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );
    this._handleFormSubmit = handleFormSubmit;
  }

  _hideInputError(input, errorMessage) {
    input.classList.remove(this._inputErrorClass);
    errorMessage.classList.remove(this._errorClass);
    errorMessage.textContent = "";
  }

  _showInputError(input, errorMessage) {
    input.classList.add(this._inputErrorClass);
    errorMessage.classList.add(this._errorClass);
    errorMessage.textContent = input.validationMessage;
  }

  _checkInputValidity(input) {
    const errorMessage = input.nextElementSibling;
    if (input.validity.valid) {
      this._hideInputError(input, errorMessage);
    } else {
      this._showInputError(input, errorMessage);
    }
  }

  _formIsValid() {
    return this._inputList.every((input) => input.validity.valid);
  }

  _setSubmitButtonState() {
    if (this._formIsValid()) {
      this._buttonElement.removeAttribute("disabled");
      this._buttonElement.classList.remove(this._inactiveButtonClass);
    } else {
      this._buttonElement.setAttribute("disabled", true);
      this._buttonElement.classList.add(this._inactiveButtonClass);
    }
  }

  _setEventListeners() {
    this._inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this._setSubmitButtonState();
      });
    });
  }
  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(evt);
      this._formElement.reset();
    });
    this._setEventListeners();
    this._setSubmitButtonState();
  }
}
