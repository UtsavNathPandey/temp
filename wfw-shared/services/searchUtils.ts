export class SearchUtils {
    public cloneItem(item, arProp, isIncludeList) {

        if (item == null || typeof (item) !== 'object') {
            return item;
        }

        if (!arProp) {
            arProp = [];
        }

        const clonedItem = JSON.parse(JSON.stringify(item));

        const arPropMap = [];
        if (arProp.length > 0) {
            for (let i = 0; i < arProp.length; i++) {
                arPropMap[arProp[i]] = true;
            }// for

            if (!isIncludeList) { // exclude list
                // loop
                for (const key in arPropMap) {
                    if (clonedItem.hasOwnProperty(key)) {
                        delete clonedItem[key];
                    }
                }

            } else {// include list
                for (const property in clonedItem) {
                    if (clonedItem.hasOwnProperty(property) && !arPropMap[property]) {
                        delete clonedItem[property];
                    }
                }
            }
        }

        return clonedItem;
    }

    public isJsonString(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }

        return true;
    }
    public isNumberEven(someNumber) {
        return (someNumber % 2 === 0) ? true : false;
    }

    public findObjectByAttrNameFromArray(arrayOfObjects, attrName, attrValueToMatch, attrModelToMatch) {
        if (arrayOfObjects && attrName) {
            for (let i = 0; i < arrayOfObjects.length; i++) {
                if (arrayOfObjects[i][attrName] === attrValueToMatch) {
                    if (attrModelToMatch) {
                        if (arrayOfObjects[i]['DataModel'] === attrModelToMatch) {
                            return arrayOfObjects[i];
                        }
                    } else {
                        return arrayOfObjects[i];
                    }
                }
            }
        }

        return null;
    }

    public escapeSpecialChars(queryStr, isFilterQuery) {

        let re = /([\||\\()"^}\(\)\[\]:{}&\+\-~!\?\/])/g;
        if (!re.test(queryStr)) {
            return queryStr;
        }

        // Special handling for filter queries
        // Escape + and &
        re = /([&\+])/g;

        if (isFilterQuery && re.test(queryStr)) {
            queryStr = queryStr.replace(/[\+]/g, '%2b');
            queryStr = queryStr.replace(/[&]/g, '%26');
        }

        // Escape all except - and +
        re = /([\||\\()^}\(\)\[\]:{}&~!\?\/])/g;
        queryStr = queryStr.replace(re, '\\$1');


        // Handle " seperately as we need it for search by word
        // If no matching quotes or filterquery we escape it. Otherwise we
        // leave it the way it is
        if (/"/g.test(queryStr)) {
            const matchCount = queryStr.match(/"/g);
            if (matchCount.length % 2 || isFilterQuery) {
                // implies no closing quotes. So we escape it
                queryStr = queryStr.replace(/(["])/g, '\\$1');
            }
        }

        // Handle + and - as we require these as AND and NOT operators
        re = /([\+\-])/g;
        if (re.test(queryStr)) {
            const arTemp = queryStr.split(' ');
            for (const item of arTemp) {
                const sTemp = arTemp[item];
                if (/^([\+\-]\w+)/g.test(sTemp)) {
                    // Valid query
                    arTemp[item] = sTemp.substring(0, 1) + sTemp.substring(1).replace(re, '\\$1');

                } else {// invalid query. escape it
                    arTemp[item] = sTemp.replace(re, '\\$1');
                }
            }// for
            queryStr = arTemp.join(' ');
        }
        return queryStr;
    }

    public isSystemField(fieldName) {
        let isSysField = false;
        const arSysFields = { 'id': true, '_version_': true, 'title': true };

        if (fieldName && (fieldName.startsWith('sys_') 
         || arSysFields[fieldName]) || fieldName.indexOf('.spatial') !== -1 
         || fieldName.indexOf('spatial') !== -1
        ) {
            isSysField = true;
        }
        return isSysField;
    }

    public getDCViewColumns(dcObj, viewName) {
        let arColumns = [];
        if (dcObj && dcObj.Views) {
            for (const key of dcObj.Views) {
                const vw = dcObj.Views[key];
                if (vw.Name === viewName) {
                    arColumns = vw.Columns;
                    break;
                }
            }
        }
        return arColumns;
    }

    public getDCColumnObjectsForViewColumns(selectedDataCatalogue, viewColumns) {
        const dataCatalogueColumns = [];
        if (selectedDataCatalogue) {
            for (let j = 0; j < viewColumns.length; j++) {
                const columnName = viewColumns[j];
                for (let i = 0; i < selectedDataCatalogue.Columns.length; i++) {
                    if (columnName === selectedDataCatalogue.Columns[i].Name) {
                        dataCatalogueColumns.push(selectedDataCatalogue.Columns[i]);
                        break;
                    }
                }
            }
        }
        return dataCatalogueColumns;
    }
}
