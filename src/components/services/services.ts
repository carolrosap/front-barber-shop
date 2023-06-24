import template from './services.html';
import axios from 'axios';

export class ServicesComponent {

  async render (): Promise<void> {
    const element = document.createElement('div');
    element.classList.add('services');
    element.insertAdjacentHTML('beforeend', template);

    const content = document.querySelector('#content');
    content?.appendChild(element);

    //const navigation = new Navigation();
    //navigation.render('gridProducts');

    //await this.showGrid(page);
  }


}
