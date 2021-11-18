const columns = require('../../config/config').columns;

module.exports = {
    getValuesQuery : function ( container , table_name ){
        const table_columns = columns[table_name];
        let result = "VALUES ( ";
        table_columns.forEach(column => {
            result += `, '${container[column]}'`
        });
        result += ")";
        result = result.replace(',','');
        console.log(result);

        return result;
    },
    gatherDataFrom : function( table_name , source
         ){
        const result = {};

    }
}