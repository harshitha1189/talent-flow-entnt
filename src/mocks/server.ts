import { setupServer } from 'msw/node';
import { handlers } from './handlers';

// Only for server/SSR
export const server = setupServer(...handlers);
