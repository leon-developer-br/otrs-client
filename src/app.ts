import { TicketService } from './service';

const tickets = [
  { title: 'Verificar Vmware vCenter', body: 'Verificar Vmware vCenter' },
  { title: 'Verificar Huawei 1', body: 'Verificar Huawei 1' },
  { title: 'Verificar hosts fisicos', body: 'Verificar hosts fisicos' },
  { title: 'Verificar switches SAN', body: 'Verificar switches SAN' },
]

tickets.forEach(({title, body}) => {
  TicketService.create({title, body, priority: '3' });  
})