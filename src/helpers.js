import moment from 'momentjs';

export function splitString (string) {
  return (string.split(/[()]/))[1];
}

export function formatDate (context) {
  return moment(context).format('D/MM/YYYY HH:mm');
}

// http://davidwalsh.name/javascript-debounce-function
export function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  }
}

