import axios from 'axios';
import * as https from 'https';
import config from 'config';

interface HostConfig {
  url: string;
}

const host: HostConfig = config.get('host');

const instance = axios.create({
  baseURL: host.url,
  headers: {'content-type': 'text-xml'},
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  })
});

export default instance;