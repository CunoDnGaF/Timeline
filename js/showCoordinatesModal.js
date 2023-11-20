import coordinatesValidator from './coordinatesValidator';

export default function showCoordinatesModal(container) {
    this.coordinatesModal = container.querySelector('.coordinates-modal');
    this.modalCloseButton = container.getElementById('modal-close');
    this.modalOkButton = container.getElementById('modal-ok');
    this.modalField = container.querySelector('.modal-field');

    this.coordinatesModal.classList.remove('unactive');
    
    this.modalCloseButton.addEventListener('click', () => {
        this.coordinatesModal.classList.add('unactive');
    });

    this.modalOkButton.addEventListener('click', () => {
      const coordinates = coordinatesValidator(this.modalField.value);
      this.coordinatesModal.classList.add('unactive');
      return coordinates;
    });
}