import sv from './messages/sv.json';

type Messages = typeof sv;

declare global {
  interface IntlMessages extends Messages {}
}
