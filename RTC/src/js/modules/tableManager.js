"use strict";

let tableManager = (function() {
  const MAX_RATIO = 100;
  const MIN_RATIO = 0;

  let responce = 200;

  return {
    resize: function() {
      let r = document.getElementById('widthResize').value;
      r = parseInt(r,10);
      if(r>MIN_RATIO && r<=MAX_RATIO) {
        
        paginator.refresh(r);
      } else {
        alert("please enter a number x in ("+MIN_RATIO+','+MAX_RATIO+']"');
        document.getElementById('widthResize').value = MAX_RATIO;
      }
    },

    enableDragAndDrop: function() {
      $('.table').dragableColumns({
         drag: true,
         dragClass: 'drag',
         overClass: 'over',
         movedContainerSelector: '.dnd-moved'
      });

      $('.table').dragableColumns();
    },

    enableHoverResize: function() {
      setInterval(function(){
        var $sample = $("#rtcTableComponent");
          if($sample.is(":hover")) {
             $sample.css("tableLayout", "auto");
          }
          else {
             $sample.css("tableLayout", "fixed");
          }
      }, responce);
    }
  }
}());