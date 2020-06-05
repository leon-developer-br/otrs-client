import * as ejs from 'ejs';
import http from '../http';
import XMLService from './xml';
import config from 'config';

export interface ICreateTicket {
  body: string;
  priority: string;
  title: string;
}

export interface ITicketRequest extends ICreateTicket {  
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
  
  async create({title, body, priority}: ICreateTicket) {    

    const payload: ITicketRequest = {
      login: this.user.login,
      title,
      body,
      fullname: this.user.fullname,
      password: this.user.password,
      priority,
    }
    
    const html = await ejs.renderFile('./src/templates/create_ticket.ejs', payload);
    
    try {
      const { data } = await http.post('otrs/nph-genericinterface.pl/Webservice/zbx', html)
      const ticket = await XMLService.convertToJSON(data);
      console.log(ticket);
    } 
    catch(error) {
      console.error(error.response.data);
    }    
  };
}

export default new TicketService();