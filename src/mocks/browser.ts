import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

// Only for client/browser
export const worker = setupWorker(...handlers);
