import axios from 'axios';
import * as https from 'https';

const instance = axios.create({
  baseURL: 'https://atendimento.trt1.jus.br',
  headers: {'content-type': 'text-xml'},
  httpsAgent: new https.Agent({  
    rejectUnauthorized: false
  })
});

export default instance;