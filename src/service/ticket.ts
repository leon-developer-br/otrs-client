import * as ejs from 'ejs';
import config from 'config';
import http from '../http';
import XMLService from './xml';
import { ITicket } from '../types';

export interface ITicketData {
  body: string;
  priority?: string;
  state?: string;
  ticketNumber?: string;
  title?: string;
  subject?: string;
}

export interface ITicketRequest extends ITicketData {
  fullname: string;
  login: string;
  password: string;
}

class TicketService {
  user: {
    fullname: string;
    login: string;
    password: string;
  };

  constructor() {
    this.user = config.get('user');
  }

  async create({ title, body, priority }: ITicketData): Promise<ITicket> {
    const payload: ITicketRequest = {
      login: this.user.login,
      title,
      body,
      fullname: this.user.fullname,
      password: this.user.password,
      priority,
    };

    const html = await ejs.renderFile(
      './src/templates/create_ticket.ejs',
      payload,
    );

    try {
      const { data } = await http.post(
        'otrs/nph-genericinterface.pl/Webservice/zbx',
        html,
      );
      const created = await XMLService.convertCreatedToJSON(data);
      console.log('Ticket created:', created);
      return created;
    } catch (error) {
      console.error(error.response.data);
      return error.response.data;
    }
  }

  async update({
    ticketNumber,
    state,
    subject,
    body,
  }: ITicketData): Promise<ITicket> {
    const payload = {
      login: this.user.login,
      password: this.user.password,
      ticketNumber,
      fullname: this.user.fullname,
      state,
      subject,
      body,
    };

    const html = await ejs.renderFile(
      './src/templates/update_ticket.ejs',
      payload,
    );

    try {
      const { data } = await http.post(
        'otrs/nph-genericinterface.pl/Webservice/zbx',
        html,
      );

      const updated = await XMLService.convertUpdatedToJSON(data);
      console.log('Ticket updated:', updated);
      return updated;
    } catch (error) {
      console.error(error.response.data);
      return error.response.data;
    }
  }
}

export default new TicketService();
