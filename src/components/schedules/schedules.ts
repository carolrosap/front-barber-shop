import template from './schedules.html';
import axios from 'axios';

export class SchedulesComponent {

  async render(): Promise<void> {
    const element = document.createElement('div');
    element.classList.add('schedules');
    element.insertAdjacentHTML('beforeend', template);

    const content = document.querySelector('#content');
    content?.appendChild(element);

    await this.loadSchedules();
  }

  async getSchedulesApi() {
    try {
      const response = await axios.get('http://localhost:3000/schedule');
      return response.data;
    } catch (error) {
      console.log('error reading data from API');
    }
  }

  async loadSchedules() {
    const schedules = await this.getSchedulesApi();
    const tableSchedules = document.querySelector('#table-schedules');

    schedules.forEach((schedule: any) => {
      const tbody = document.createElement('tbody');
      const tr = document.createElement('tr');

      const id = document.createElement('td');
      id.setAttribute('scope', 'row');
      const date = document.createElement('td');
      const time = document.createElement('td');
      const available = document.createElement('td');
      const professional = document.createElement('td');
      const actions = document.createElement('td');

      const newDate =  this.formatDate(schedule.date);

      id.textContent = schedule.id;
      date.textContent = newDate;
      time.textContent = schedule.time;
      available.textContent = schedule.available ? 'Disponível' : 'Indisponível';
      professional.textContent = schedule.professional.name;
      
      actions.innerHTML = '<i class="fa-solid fa-pencil"></i><i class="fa-solid fa-trash"></i>'

      tr.appendChild(id);
      tr.appendChild(date);
      tr.appendChild(time);
      tr.appendChild(available);
      tr.appendChild(professional);
      tr.appendChild(actions);

      tbody.appendChild(tr);
      tableSchedules?.appendChild(tbody);
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
