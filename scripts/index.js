const profileEditButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close');
const popupForm = document.querySelector('.popup__form');
const popupInputEditName = document.querySelector('.popup__input_edit_name');
const popupInputEditProfession = document.querySelector('.popup__input_edit_profession');
const profileTitle = document.querySelector('.profile__title');
const profileProfession = document.querySelector('.profile__subtitle');

profileEditButton.addEventListener('click', () => {
  popup.style.display = 'flex';
}
);

popupCloseButton.addEventListener('click', () => {
  popup.style.display = 'none';
}
);

popupForm.addEventListener('submit', (event) => {
  event.preventDefault();
  profileTitle.textContent = popupInputEditName.value;
  profileProfession.textContent = popupInputEditProfession.value;
  popup.style.display = 'none';
  }
);