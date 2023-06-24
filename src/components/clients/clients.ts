import template from './clients.html';
import axios from 'axios';

export class ClientsComponent {

  async render(): Promise<void> {
    const element = document.createElement('div');
    element.classList.add('clients');
    element.insertAdjacentHTML('beforeend', template);

    const content = document.querySelector('#content');
    content?.appendChild(element);

    await this.loadClients();
  }

  async getClientsApi() {
    try {
      const response = await axios.get('http://localhost:3000/client');
      return response.data;
    } catch (error) {
      console.log('error reading data from API');
    }
  }

  async loadClients() {
    const clients = await this.getClientsApi();
    const tableClients = document.querySelector('#table-clients');

    clients.forEach((client: any) => {
      const tbody = document.createElement('tbody');
      const tr = document.createElement('tr');

      const id = document.createElement('td');
      id.setAttribute('scope', 'row');
      const name = document.createElement('td');
      const cpf = document.createElement('td');
      const telephone = document.createElement('td');
      const actions = document.createElement('td');

      id.textContent = client.id;
      name.textContent = client.name;
      cpf.textContent = client.cpf;
      telephone.textContent = client.telephone;
      actions.innerHTML = '<i class="fa-solid fa-pencil"></i><i class="fa-solid fa-trash"></i>'

      tr.appendChild(id);
      tr.appendChild(name);
      tr.appendChild(cpf);
      tr.appendChild(telephone);
      tr.appendChild(actions);

      tbody.appendChild(tr);
      tableClients?.appendChild(tbody);
    });

  }


}
