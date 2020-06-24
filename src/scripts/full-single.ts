import { TicketService } from '../service';

const init = async () => {
  const [, , title, body] = process.argv;

  const ticket = await TicketService.create({ title, body, priority: '3' });

  const { ticketNumber } = ticket;

  await TicketService.update({
    ticketNumber,
    state: ' in attendance',
    subject: 'Em atendimento',
    body: 'Em atendimento',
  });

  await TicketService.update({
    ticketNumber,
    state: 'solved',
    subject: 'Solucionado',
    body: 'Solucionado',
  });
};

init();
