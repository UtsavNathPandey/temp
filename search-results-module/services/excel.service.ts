import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import * as Workbook from 'workbook';
import { saveAs } from 'file-saver';
declare function saveAs(blob: Blob, filename: string);


@Injectable()
export class ExcelService {

  constructor() { }

  /**
   * @method export
   * @description export the grida data to the workbook
   * @param grid data array
  */
  exportToExcel(data: any[], workbookName: string) {
    const workbook = new Workbook();

    workbook.addRowsToSheet(workbookName, this.transformData(data)).finalize();
    this.saveWorkbookAs(workbook, workbookName + '.xlsx');
  }

  /**
   * @method transformData
   * @description transform the grid data to the required array
   * @param grid data array
  */
  private transformData(data: any[]): Array<any> {
    const excelRows = [];
    const carRow = data[0];
    const colsData = this.curateColumnHeader(carRow);

    // call the method to set the columns
    excelRows.push(colsData);
    data.forEach(row => {
      const excelRow = [];
      for (let i = 0, len = colsData.length; i < len; i++) {
        const cell = row[colsData[i].v.toLocaleLowerCase()];
        const value = cell.value || cell;
        const style = (cell.color  ? this.extractColor(cell.color) : '');
        excelRow.push({'v':  value,  's':  style});
      }
      excelRows.push(excelRow);
    });
    return excelRows;
  }

  /**
   * @method curateColumnHeader
   * @description extract the header as an array
   * @param carRow as an object
  */
  private curateColumnHeader(carRow: any): Array<any> {
    const cols = [];
    Object.keys(carRow).forEach(key => {
      cols.push({'v':  key.toUpperCase(),  's':  {fill:  { fgColor:  { rgb:  'FFFF0000'}}}});
    });
    return cols;
  }

  /**
   * @method saveWorkbookAs
   * @description save the workbook as a blob object
   * @param workbook and filename
  */
  private saveWorkbookAs(workbook: any, filename: string) {
    const wopts = { bookType: 'xlsx', bookSST: false, type: 'binary' };

    /* the saveAs call downloads a file on the local machine */
    const wbout = XLSX.write(workbook, { bookType: 'xlsx', bookSST: false, type: 'binary'});
    saveAs(new Blob([this.s2ab(wbout)], { type: 'application/octet-stream' }), filename);
    // saveAs(new Blob([this.s2ab(wbout)], { type: '' }), filename);
  }

  private s2ab(s) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for ( let i = 0; i !== s.length; ++i) {
      /* tslint:disable */
      view[i] = s.charCodeAt(i) & 0xFF;
      /* tslint:enable */
    }
    return buf;
  }

  /**
   * @method extractColor
   * @param color: the Color attribute passed from the dataset
   * @description To resolve the color attribute to be passed on to the created Excel file
  */
  private extractColor(color: string): {} {
    switch (color) {
      case 'red': return {fill:  { fgColor:  { rgb:  'FF0000'}}};
      case 'orange': return {fill:  { fgColor:  { rgb:  'FFA500'}}};
      case 'blue': return {fill:  { fgColor:  { rgb:  '0000FF'}}};
      case 'yellow': return {fill:  { fgColor:  { rgb:  'FFFF00'}}};
    }
  }


}
