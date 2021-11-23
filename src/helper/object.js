module.exports = {
    isEmpty : function( x ){
        let result = false;
        Object.values(x).forEach(value => {
            if(value === ""|| value === null)
            result = true;
        })
        return result;
    },
    sameStructure : function( object , requirements ){
        let result = true;
        requirements.forEach( key => {
            if(object[key] == null){
                console.log(
                    key + 'IS NULL'
                );
                result = false;
            }
        });

        return result;
    },
    merge : function (x , y){
        if(y !== undefined)
        Object.keys(y).forEach(key => {
            x[key] = y[key]
        });
        return x;
    }
}