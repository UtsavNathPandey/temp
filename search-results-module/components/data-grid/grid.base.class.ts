/*
   @description this class is used to override core funcionality of grid dataTable(primeng).
*/
import { DataTable } from 'primeng/primeng';

export class GridBaseClass {


   /*
   @method disableDragOnColumn
   @description this method is used to disable Drag on specific column for the grid dataTable
  */
   public disableDragOnColumn(): void {
       DataTable.prototype.onHeaderMousedown = function (event, header) {
         if (this.reorderableColumns) {
             if (
                 event.target.nodeName !== 'INPUT'
                 && !event.target.classList.contains('drag-false')
                 && !event.target.classList.contains('ui-chkbox')
                ) {
                 header.draggable = true;
             } else if (event.target.nodeName === 'INPUT') {
                 header.draggable = false;
             }
         }
      };
     }

   /*
   @method disableDropOnColumn
   @description this method is used to disable Drop on specific column for the grid dataTable
  */
   public disableDropOnColumn(): void {
       DataTable.prototype.onColumnDrop = function (event) {
         event.preventDefault();
         if (this.draggedColumn) {
             const dragIndex = this.domHandler.index(this.draggedColumn);
             const dropIndex = this.domHandler.index(this.findParentHeader(event.target));
             let allowDrop = (dragIndex !== dropIndex);
             const dropDisable = (event.target.classList.contains('drag-false') || event.target.classList.contains('ui-chkbox'));
             if (
                 allowDrop
                 && ((dropIndex - dragIndex === 1 && this.dropPosition === -1)
                 || (dragIndex - dropIndex === 1 && this.dropPosition === 1))
                ) {
                 allowDrop = false;
             }
             if (allowDrop && !dropDisable) {
                 this.objectUtils.reorderArray(this.scrollable ? this.scrollableColumns : this.columns, dragIndex, dropIndex);
                 this.onColReorder.emit({
                     dragIndex: dragIndex,
                     dropIndex: dropIndex,
                     columns: this.scrollable ? this.scrollableColumns : this.columns
                 });
             }
             this.reorderIndicatorUp.style.display = 'none';
             this.reorderIndicatorDown.style.display = 'none';
             this.draggedColumn.draggable = false;
             this.draggedColumn = null;
             this.dropPosition = null;
         }
     };

  }
}
