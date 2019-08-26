"use strict";

let maxPage = 1;
let maxResult = 1;

let paginator = (function() {
  let col = null;
  let currentPage = 1;
  let seed = 'abc';
  let userData = [];
  let defaultResourceOrigin = 'https://randomuser.me/api/';

  function pagify(array,displayLine) {
    let base = [];
    for(let i = 0;i<array.length;i+=displayLine) {
      base.push(array.slice(i,i+displayLine));
    } 
    return base;
  }

  function getcolumns(data) {
    return Object.keys(data[0]);
  }

  function displayTable(table) {
    tableWorker.render(tableWorker.getTableComponent(),table);
    displayPageNumber();
  }

  function displayPageNumber() {
    document.getElementById('pagenumber').innerHTML = 'current page: <strong>'+currentPage+'</strong> ';
  }

  return {
    getUserData: function() {
      return userData;
    },

    getColumn: function() {
      return col;
    },

    initTableComponent: async function(mP,mR,sed,origin) {
      if(typeof mP !=="number" || typeof mR !=="number" ) {
        alert("invalid display options");
        return;
      }

      maxPage = mP || maxPage;
      maxResult = mR || maxResult;
      seed = sed || seed;
      defaultResourceOrigin = origin || defaultResourceOrigin;
      
      let userdataTemp = [];

      for(let i = 1;i<=maxPage;i++) {
        await $.ajax({
        url: defaultResourceOrigin+'?page='+i+'&results='+maxResult+'&seed='+seed,
        dataType: 'json',
        success: function(data) { 
            if(!data) {
              return;
            }
            let rowIterable = {};
            let perPage =  tableWorker.getUser(data);
            for(let i = 0;i<perPage.length;i++) {
              userdataTemp.push(perPage[i]);
            }
          }
        });
      }
      for(let i = 0; i<userdataTemp.length; i++) {
        let perLine = {};
        iterator.iterate(userdataTemp[i],perLine);
        userData.push(perLine);
      }
      col = getcolumns(userData);
      userData = pagify(userData,maxResult);
    },

    refresh: function(ratio) {
      sizeRatio = ratio;
      let table = tableWorker.toTable(col,userData[currentPage-1]);
      displayTable(table);
    },

    first: function() {
      let table = tableWorker.toTable(col,userData[0]);
      currentPage = 1;
      displayTable(table);
    },

    previous: function() {
      currentPage===1?null:(--currentPage);
      let table = tableWorker.toTable(col,userData[currentPage-1]);
      displayTable(table);
    },

    next: function() {
      currentPage===maxPage?null:(++currentPage);
      let table = tableWorker.toTable(col,userData[currentPage-1]);
      displayTable(table);
    },

    last: function() {
      let table = tableWorker.toTable(col,userData[maxPage-1]);
      currentPage = maxPage;
      displayTable(table);
    }
  }
}());