import moment from 'moment';

export default function date(date) {
  return moment(date).format('DD/MM/YYYY HH:mm');
}