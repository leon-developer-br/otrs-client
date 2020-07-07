import sleep from 'sleep';
import config from 'config';
import { TicketService } from '../service';
import { IConfigTicket } from '../types';

const configTicket: IConfigTicket = config.get('ticket');

const data = [
  { title: 'Verificar Vmware vCenter', body: 'Verificar Vmware vCenter' },
  { title: 'Verificar Huawei 1', body: 'Verificar Huawei 1' },
  { title: 'Verificar hosts fisicos', body: 'Verificar hosts fisicos' },
  { title: 'Verificar switches SAN', body: 'Verificar switches SAN' },
];

const promises = data.map(({ title, body }) =>
  TicketService.create({ title, body, priority: '3' }),
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
