import template from './services.html';
import axios from 'axios';

export class ServicesComponent {

  async render(): Promise<void> {
    const element = document.createElement('div');
    element.classList.add('services');
    element.insertAdjacentHTML('beforeend', template);

    const content = document.querySelector('#content');
    content?.appendChild(element);

    await this.loadServices();
  }

  async getServicesApi() {
    try {
      const response = await axios.get('http://localhost:3000/service');
      return response.data;
    } catch (error) {
      console.log('error reading data from API');
    }
  }

  async loadServices() {
    const services = await this.getServicesApi();
    const tableServices = document.querySelector('#table-services');
    services.forEach((service: any) => {
      const tbody = document.createElement('tbody');
      const tr = document.createElement('tr');

      const id = document.createElement('td');
      id.setAttribute('scope', 'row');
      const name = document.createElement('td');
      const user = document.createElement('td');
      const actions = document.createElement('td');

      id.textContent = service.id;
      name.textContent = service.category.name;
      user.textContent = service.professional.name;
      actions.innerHTML = '<i class="fa-solid fa-pencil"></i><i class="fa-solid fa-trash"></i>'

      tr.appendChild(id);
      tr.appendChild(name);
      tr.appendChild(user);
      tr.appendChild(actions);

      tbody.appendChild(tr);
      tableServices?.appendChild(tbody);
    });

  }


}
