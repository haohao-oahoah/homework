"use strict";

const MAX_LENGTH = 30;
let sizeRatio = 100;

let tableWorker = (function() {
  let tableComponent = React.createClass({ displayName: "TableComponent",
    render: function (tableData) {
      // Data
      let dataColumns = this.props.data.columns;
      let dataRows = this.props.data.rows;

      let tableHeaders = React.createElement("thead", null,
      React.createElement("tr", {className: "dnd-moved"},
      dataColumns.map(function (column) {
        return React.createElement("th", null, btnElementary(column));})));

      let tableBody = dataRows.map(function (row) {
        return React.createElement("tbody", null,
          React.createElement("tr", {className: "dnd-moved"},
          dataColumns.map(function (column) {
              if(typeof row[column] === "string" && row[column].slice(0,4)==="http") {
                return React.createElement("td", {style: {width: "100%",
                                                  wordBreak: "break-all"}}, 
                                                  urlElementary(row[column]));
              }  else {
                return React.createElement("td", {className: "cell expand-small-on-hover",
                                                  style: {width: "100%",
                                                  wordBreak: "break-all"
                                                  }}, row[column]);
              }
            })
          ));
      });

      return React.createElement("table", { id:"rtcTableComponent",
                                            className: "table table-bordered table-hover",
                                            style: {
                                            tableLayout: 'fixed',
                                            width: sizeRatio + '%'}},
                                            tableHeaders,
                                            tableBody);} });

  function btnElementary(info) {
    return React.createElement("button", {id: info}, info);
  }

  function urlElementary(link) {
    if(link.indexOf("thumb")>0) {
      return React.createElement("a", {href: link.replace("thumb/", "")}, imageElementary(link));
    } else {
      return React.createElement("a", {href: link}, "url");
    }
  }

  function imageElementary(info) {
    return React.createElement("img", {src: info, href: info});
  }

  return {
    getTableComponent: function() {
      return tableComponent;
    },

    getUser: function(data) {
      for(var prop in data) {
        if(!data.hasOwnProperty(prop)) {
          return;
        }
        return data.results;
      }
      alert("error finding displayables"); 
    },

    toTable: function(col,row) {
      return {columns:col, rows:row};
    },

    render: function(component, tableData) {
      ReactDOM.render( React.createElement(component, { data: tableData }), document.getElementById('table-component'));
    }
  }
}());
