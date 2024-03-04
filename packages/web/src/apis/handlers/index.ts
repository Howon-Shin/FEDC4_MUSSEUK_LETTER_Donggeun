import { handlers as userHandlers } from './user';
import { handlers as postHandlers } from './post';

export const handlers = [...userHandlers, ...postHandlers];
