import { Entry } from './models';
// const isDev = process.env.NODE_ENV === 'development';

const dbInit = () => {
  Entry.sync();
};
export default dbInit;

