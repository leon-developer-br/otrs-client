import { TicketService } from './service';

const init = async () => {
  const [, , title, body] = process.argv;

  const ticket = await TicketService.create({ title, body, priority: '3' });

  const { ticketNumber } = ticket;

  TicketService.inAttendance({ ticketNumber, body: 'Em atendimento' });

  TicketService.close({ ticketNumber, body: 'Solucionado' });
};

init();
