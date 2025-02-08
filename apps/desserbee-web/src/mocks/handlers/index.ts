import { HttpHandler } from 'msw';
import { userHandlers } from './user-handlers';
import { storeHandlers } from './store-handlers';

export const handlers: HttpHandler[] = [...userHandlers, ...storeHandlers];
