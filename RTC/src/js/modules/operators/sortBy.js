"use strict";

let sortBy = (function() {
  let cat = [];
  let currentSort = null;

  function sortBy(sort) {
    if(!sort) {
      return;
    }
    currentSort = sort;
    let k = 0;
    catLogic();
    cat = cat.sort(sortByLikely);
    for(let i=0;i<maxPage*maxResult;i+=maxResult){
      for(let j = 0;j<maxResult;j++) {
        if(cat[i+j]) {
          paginator.getUserData()[k][j] = cat[i+j];
        }
      }
      k++
    }
    paginator.first();
  }

  function sortByLikely(x,y) {
    let u = valueLogic(x,currentSort);
    let v = valueLogic(y,currentSort);

    if(!u || !v) {
      return;
    }

    [u,v] = pictureid(u,v);
    if(isGender(u,v)) {
      return (u==v)?0:((u>v)?1:-1);
    }

    if(typeof u === "string" &&
       typeof v === "string" ) {
      u = u[0]+u.slice(1,u.length).split('-').join('');
      u = u[0]+u.slice(1,u.length).split('(').join('');
      u = u[0]+u.slice(1,u.length).split(')').join('');
      u = u[0]+u.slice(1,u.length).split(':').join('.');

      v = v[0]+v.slice(1,v.length).split('-').join('');
      v = v[0]+v.slice(1,v.length).split('(').join('');
      v = v[0]+v.slice(1,v.length).split(')').join('');
      v = v[0]+v.slice(1,v.length).split(':').join('.');
    }

    if(typeof parseInt(u,10) === "number" && 
       typeof parseInt(v,10) === "number" ) {
      if(u.indexOf('.')>0&&v.indexOf('.')>0) {
        u = parseFloat(u,10);
        v = parseFloat(v,10);
      } else {
        u = parseInt(u,10);
        v = parseInt(v,10);
      }
    }

    if(u < v) { return -1; }
    if(u > v) { return 1; }
    return 0;
  }

  function isGender(x,y) {
    if(currentSort === "gender"||"Gender") {
      return true;
    }
    return false;
  }

  function pictureid(u,v) {
    if(typeof u !== "string" || u.slice(0,4)!=="http") {
      return [u,v];
    }
    if(typeof v !== "string" || v.slice(0,4)!=="http") {
      return [u,v];
    }
    let a = '';
    let b = '';
    for(let i = u.length-1;i>0;i--) {
      if(u[i] !== '/') {
        a = a.concat(u[i]);
      } else {
        break;
      }
    }
    a = parseInt(a.split("").reverse().join(""),10);
    for(let i = v.length-1;i>0;i--) {
      if(v[i] !== '/') {
        b = b.concat(v[i]);
      } else {
        break;
      }
    }
    b = parseInt(b.split("").reverse().join(""),10);

    return [a,b];
  }

  function catLogic() {
    if(cat.length>0) {
      return;
    }
    for(let i = 0; i<paginator.getUserData().length; i++) {
      cat = cat.concat(paginator.getUserData()[i]);
    }
  }

  function valueLogic(obj,key) {
    let hold = null;
    if(obj[key]) {
      hold = obj[key];
    }
    return hold;
  }

  return {
    assignSortFunction: function() {
      let tempCol = paginator.getColumn();
      if(!tempCol&&tempCol.length===0) {
        return;
      }
      for(let i = 0; i<tempCol.length; i++) {
        document.getElementById(tempCol[i]).onclick = function () {
          sortBy(tempCol[i]);
        };
      }
    }
  }
}());