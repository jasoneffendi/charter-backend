var Excel = require('exceljs');
var workbook = new Excel.Workbook();

var newSheet = workbook.addWorksheet('My Sheet');


class Chart {
    constructor() {
        this.name = 'Chart'
    }

    static getData(req,res) {
        workbook.xlsx.writeFile("./mined_data/some.xlsx").then(function() {
            console.log("xls file is written.");
            res.send('xls file is written')            
        });
    }
}



module.exports = Chart