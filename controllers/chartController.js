var Excel = require('exceljs');
var workbook = new Excel.Workbook();

var newSheet = workbook.addWorksheet('My Sheet');


class Chart {
    constructor() {
        this.name = 'Chart'
    }

    static getData(req,res) {
        var worksheet = workbook.getWorksheet('My Sheet')
        worksheet.addRow([3, 'Sam', new Date()]);
        worksheet.addRow([4, 'Sammy', new Date()]);
        workbook.xlsx.writeFile(`./mined_data/${Date.now()}.xlsx`).then(function() {
            console.log("xls file is written.");
            res.send('xls file is written')            
        });
    }
}



module.exports = Chart