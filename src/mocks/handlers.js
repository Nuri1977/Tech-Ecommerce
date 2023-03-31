//src/mocks/handlers.js
import { rest } from 'msw';
import { mockUsers } from './resolvers/mockUsers';

export const handlers = [rest.get('https://jsonplaceholder.typicode.com/users', mockUsers)];
