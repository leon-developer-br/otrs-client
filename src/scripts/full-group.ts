import sleep from 'sleep';
import config from 'config';
import { TicketService } from '../service';
import { IConfigTicket } from '../types';

const configTicket: IConfigTicket = config.get('ticket');

const data = [
  { title: 'Verificar Vmware vCenter' },
  { title: 'Verificar Vmware vRealize' },
  { title: 'Verificar storage Huawei 1' },
  { title: 'Verificar storage Huawei 2' },
  { title: 'Verificar storage Huawei 3' },
  { title: 'Verificar storage Netapp' },
  { title: 'Verificar storage IBM' },
  { title: 'Verificar hosts fisicos' },
  { title: 'Verificar app Dell OME' },
  { title: 'Verificar switches SAN' },
];

const promises = data.map(({ title }) =>
  TicketService.create({ title, body: title, priority: '3' }),
);

Promise.all(promises).then(tickets => {
  sleep.sleep(configTicket.delay);

  tickets.forEach(async ticket => {
    await TicketService.update({
      ticketNumber: ticket.ticketNumber,
      state: ' in attendance',
      subject: 'Em atendimento',
      body: 'Em atendimento',
    });

    await TicketService.update({
      ticketNumber: ticket.ticketNumber,
      state: 'solved',
      subject: 'Solucionado',
      body: 'Solucionado',
    });
  });
});
