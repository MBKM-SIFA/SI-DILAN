module.exports = {
    current_date : function () {
        const date = new Date();
        return (
            date.getFullYear() + '-' +
            (date.getMonth()+1) + '-' +
            date.getDate()
        )
    }
}