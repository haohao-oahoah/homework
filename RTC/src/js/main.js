///////////////////
/*				 */
/*		RTC 	 */
/*				 */
///////////////////

const TEST_DATA = [14 /*maxPage*/,
				  10 /*maxResult per page*/,
				  'x2a'/* random seed */];

function main() {
	Promise.resolve(paginator.initTableComponent.apply(this,TEST_DATA)).then(()=>{
		paginator.first();
	}).then(()=>{
		tableManager.enableDragAndDrop();
		sortBy.assignSortFunction();
		tableManager.enableHoverResize();
	});
}

main();