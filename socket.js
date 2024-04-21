import { io } from 'socket.io-client';
import { host } from './utils/apiRoutes';


export const socket = io.connect(host);