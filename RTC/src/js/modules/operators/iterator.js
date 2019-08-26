"use strict";
let iterator = (function() {
  return {
    iterate: function(obj, iterable) {
      if(!obj) {
      	return;
      }
      iterable = iterable || {}; 
      Object.keys(obj).forEach(key => {
      if (typeof obj[key] === 'string') {
      	if(iterable[key]) {
      		return;
      	}
        iterable[key] = obj[key];
      }

      if (typeof obj[key] === 'object') {
          iterator.iterate(obj[key],iterable);
        }
      });
    }
  }
}());