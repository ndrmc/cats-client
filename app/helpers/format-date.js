import Ember from 'ember';
import { DateFormats } from '../config/consts';

export function formatDate(params) {

  var datetime = params[0], format = params[1];

  if (moment) {
    format = DateFormats[format] || format;
    return moment(datetime).format(format);
  }
  else {
    return datetime;
  }
}

export default Ember.Helper.helper(formatDate);
