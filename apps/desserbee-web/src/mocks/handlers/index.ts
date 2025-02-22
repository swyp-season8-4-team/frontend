import { HttpHandler } from 'msw';
import { userHandlers } from './user-handlers';
import { storeHandlers } from './store-handlers';
import { mateHandlers } from './mate-handlers';

export const handlers: HttpHandler[] = [
  ...userHandlers,
  ...storeHandlers,
  ...mateHandlers,
];
