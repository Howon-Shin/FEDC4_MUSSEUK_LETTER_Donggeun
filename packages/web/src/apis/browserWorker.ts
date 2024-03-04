import { setupWorker } from 'msw/browser';
import { getMusseukMock } from './orval/orval.msw';
import { handlers } from './handlers';

export const worker = setupWorker(...handlers);
