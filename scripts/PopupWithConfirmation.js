import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleConfirm) {
    super(popupSelector);
    this._handleConfirm = handleConfirm;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup
      .querySelector(".popup__form")
      .addEventListener("submit", (evt) => {
        evt.preventDefault();
        this._handleConfirm();
      });
  }

  setSubmitAction(action) {
    this._handleConfirm = action;
  }
}
