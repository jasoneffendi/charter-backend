var Excel = require('exceljs');
var workbook = new Excel.Workbook();
var fs = require('fs');
var files = fs.readdirSync('./mined_data');

var newSheet = workbook.addWorksheet('My Sheet');


class Chart {
    constructor() {
        this.name = 'Chart'
    }

    static getData(req,res) {
        console.log(files)
        workbook.xlsx.readFile("./mined_data/spreadsheet/" + files[0])
        .then(function(data) {
            // use workbook
            console.log(data)
        });
        // var worksheet = workbook.getWorksheet('My Sheet')
        // worksheet.addRow([3, 'Sam', new Date()]);
        // worksheet.addRow([4, 'Sammy', new Date()]);
        // workbook.xlsx.writeFile(`./mined_data/${Date.now()}.xlsx`).then(function() {
        //     console.log("xls file is written.");
        //     res.send('xls file is written')            
        // });
    }
}



module.exports = Chart