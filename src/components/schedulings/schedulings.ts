import template from './schedulings.html';
import axios from 'axios';

export class SchedulingsComponent {

  async render(): Promise<void> {
    const element = document.createElement('div');
    element.classList.add('schedulings');
    element.insertAdjacentHTML('beforeend', template);

    const content = document.querySelector('#content');
    content?.appendChild(element);

    await this.loadSchedulings();
  }

  async getSchedulingsApi() {
    try {
      const response = await axios.get('http://localhost:3000/scheduling');
      return response.data;
    } catch (error) {
      console.log('error reading data from API');
    }
  }

  async loadSchedulings() {
    const schedulings = await this.getSchedulingsApi();
    const tableSchedulings = document.querySelector('#table-schedulings');

    schedulings.forEach((scheduling: any) => {
      console.log(scheduling);
      const tbody = document.createElement('tbody');
      const tr = document.createElement('tr');

      const id = document.createElement('td');
      id.setAttribute('scope', 'row');
      const date = document.createElement('td');
      const time = document.createElement('td');
      const service = document.createElement('td');
      const client = document.createElement('td');
      const professional = document.createElement('td');
      const actions = document.createElement('td');

      const newDate = this.formatDate(scheduling.schedule.date);

      id.textContent = scheduling.id;
      date.textContent = newDate;
      time.textContent = scheduling.schedule.time;
      service.textContent = scheduling.service.category.name;
      client.textContent = scheduling.client.name;
      professional.textContent = scheduling.service.professional.name;

      actions.innerHTML = '<i class="fa-solid fa-pencil"></i><i class="fa-solid fa-trash"></i>'

      tr.appendChild(id);
      tr.appendChild(date);
      tr.appendChild(time);
      tr.appendChild(service);
      tr.appendChild(client);
      tr.appendChild(professional);
      tr.appendChild(actions);

      tbody.appendChild(tr);
      tableSchedulings?.appendChild(tbody);
    });

  }

  formatDate(rawDate: string): string {
    const date = new Date(rawDate);

    const day = date.getDate().toString().padStart(2, '0'); // get the day as number (1-31)
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // get the month as number (0-11)
    const year = date.getFullYear(); // get the year

    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  }

}
