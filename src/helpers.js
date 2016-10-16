import moment from 'momentjs';

export function splitString (string) {
  return (string.split(/[()]/))[1];
}

export function formatDate (context) {
  return moment(context).format('D/MM/YYYY HH:mm');
}
