import coordinatesValidator from './coordinatesValidator';

export default class Timeline {
  constructor(container) {
    this.container = container;
    this.timelineBody = container.querySelector('.timeline-body');
    this.postField = container.querySelector('.post-field');
    this.coordinatesModal = container.querySelector('.coordinates-modal');
    this.modalCloseButton = container.getElementById('modal-close');
    this.modalOkButton = container.getElementById('modal-ok');
    this.modalField = container.querySelector('.modal-field');
    this.coordinatesValidator = coordinatesValidator;
  }
  

  init() {
    this.postField.addEventListener('keydown', (e) => this.addPost(e));
  }

 async addPost(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      const text = this.postField.value;
      const coordinates = await this.getCoordinates();

      if (typeof coordinates === 'string') {
        alert(coordinates);
      } 
      
      if (typeof coordinates === 'object') {
        this.timelineBody.append(this.createPost(text, coordinates));
        this.postField.value = '';
      }
    }
  }

  async getCoordinates() {
    if ('geolocation' in navigator) {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(
            (pos) => resolve(pos.coords),
            (error) => reject(error),
          );
        });
        const coordinates = {
          latitude: position.latitude,
          longitude: position.longitude,
        };
        return coordinates;
      } catch {
        return this.showCoordinatesModal();
      }
    } else {
      return this.showCoordinatesModal();
    }
  }

  showCoordinatesModal() {
    this.coordinatesModal.classList.remove('unactive');
    
    return new Promise((resolve) => {
      this.modalOkButton.addEventListener('click', () => {
        this.coordinatesModal.classList.add('unactive');
        const coordinates = this.coordinatesValidator(this.modalField.value);
        
        resolve(coordinates);
      });

      this.modalCloseButton.addEventListener('click', () => {
        this.coordinatesModal.classList.add('unactive');

        resolve(null);
      });
    });
  }
  
  createPost(text, coordinates) {

    const post = document.createElement('div');
    post.classList.add('post');

    post.innerHTML = `
      <div class="post-header">
        <span class="post-date">${new Date().toLocaleString('ru-RU')}</span>
      </div>
      <span class="post-content">${text}</span>
      <div class="post-footer">
        <span class="post-coordinates">[${coordinates.latitude}, ${coordinates.longitude}]</span>
      </div>
    `

    return post;
  }

}