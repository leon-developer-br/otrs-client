import * as xml2js from 'xml2js';

interface ITicketResponse {
  TicketId: string[];
  TicketNumber: string[];
}

class XMLService {
  async convertToJSON(xml: string): Promise<ITicketResponse> {
    const converted = await xml2js.parseStringPromise(xml, { mergeAttrs: true });
    const ticketResponse = converted['soap:Envelope']['soap:Body'][0]['TicketCreateResponse'][0] as ITicketResponse
    return ticketResponse;
  }
}

export default new XMLService();