import template from './home.html';
import axios from 'axios';

export class HomeComponent {

  async render (): Promise<void> {
    const element = document.createElement('div');
    element.classList.add('home');
    element.insertAdjacentHTML('beforeend', template);

    const content = document.querySelector('#content');
    content?.appendChild(element);

    //const navigation = new Navigation();
    //navigation.render('gridProducts');

    //await this.showGrid(page);
  }


}
