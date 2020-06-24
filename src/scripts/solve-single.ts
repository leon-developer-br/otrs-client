import { TicketService } from '../service';

const init = async () => {
  const [, , ticketNumber] = process.argv;

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
