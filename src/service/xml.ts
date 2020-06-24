import * as xml2js from 'xml2js';
import { ITicket } from '../types';

interface ITicketResponse {
  TicketNumber: string[];
}

class XMLService {
  static async convertCreatedToJSON(xml: string): Promise<ITicket> {
    const converted = await xml2js.parseStringPromise(xml, {
      mergeAttrs: true,
    });
    const { TicketCreateResponse } = converted['soap:Envelope']['soap:Body'][0];
    return XMLService.parseData(TicketCreateResponse);
  }

  static async convertUpdatedToJSON(xml: string): Promise<ITicket> {
    const converted = await xml2js.parseStringPromise(xml, {
      mergeAttrs: true,
    });
    const { TicketUpdateResponse } = converted['soap:Envelope']['soap:Body'][0];
    return XMLService.parseData(TicketUpdateResponse);
  }

  static parseData(response: ITicketResponse[]): ITicket {
    return response.map<ITicket>((ticket: ITicketResponse) => ({
      ticketNumber: ticket.TicketNumber[0],
    }))[0];
  }
}

export default XMLService;
