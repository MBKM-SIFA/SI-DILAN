module.exports = {
    current_date : function () {
        const date = new Date();
        return (
            date.getFullYear() + '-' +
            (date.getMonth()+1) + '-' +
            date.getDate()
        )
    },
    dateWithDay : function ( date ) {

        const day = [
            'Minggu',
            'Senin',
            'Selasa',
            'Rabu',
            'Kamis',
            `Jum'at`,
            `Sabtu`,
        ];

        const month = [
            'Januari' ,
            'Februari' ,
            'Maret' ,
            'April' ,
            'Mei' ,
            'Juni' ,
            'Juli' ,
            'Agustus' ,
            'September' ,
            'Oktober' ,
            'November' ,
            'Desember'
        ];

        return (
            day[date.getDay()] + ' , ' +
            date.getDate() + ' ' +
            month[date.getMonth()] + ' ' +
            date.getFullYear() + ' '
        );
    },
    dateOnly : function ( date ) {
        
        const month = [
            'Januari' ,
            'Februari' ,
            'Maret' ,
            'April' ,
            'Mei' ,
            'Juni' ,
            'Juli' ,
            'Agustus' ,
            'September' ,
            'Oktober' ,
            'November' ,
            'Desember'
        ];

        return (
            date.getDate() + ' ' +
            month[date.getMonth()] + ' ' +
            date.getFullYear() + ' '
        );
    },
    currentYear : function () {
        return new Date().getFullYear();
    },
    letterNumber : function ( number ) {

        
        const addition =  3 - number.toString().length;

        console.log(
            'addition : ' + addition +
            'number : ' + number +
            'number.length : ' + number.length
        );

        let result = '';

        for (let i = 0; i < addition; i++) {
            result += '0';
        }

        result += number;

        console.log('result : ' + result);
        return result;
    }
}