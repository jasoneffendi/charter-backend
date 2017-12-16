var Excel = require('exceljs');
var workbook = new Excel.Workbook();
var fs = require('fs');


var newSheet = workbook.addWorksheet('My Sheet');


class Chart {
    constructor() {
        this.name = 'Chart'
    }

    static getList(req,res) {
        fs.readdir('./mined_data/spreadsheet', (err, xlsx) => {
            fs.readdir('./mined_data/json', (err, json) => {
                console.log(xlsx)
                console.log(json)
                res.status(200).send({
                    spreadsheets: xlsx,
                    json: json
                })
            })
        });

        // workbook.xlsx.readFile("./mined_data/spreadsheet/" + files[0])
        // .then(function(data) {
        //     // use workbook
        //     console.log(data)
        // });
        // var worksheet = workbook.getWorksheet('My Sheet')
        // worksheet.addRow([3, 'Sam', new Date()]);
        // worksheet.addRow([4, 'Sammy', new Date()]);
        // workbook.xlsx.writeFile(`./mined_data/${Date.now()}.xlsx`).then(function() {
        //     console.log("xls file is written.");
        //     res.send('xls file is written')            
        // });
    }

    static readData(req,res) {
        if(req.params.fileName[req.params.fileName.length - 1] == "n") {
            console.log('json')
            fs.readFile('./mined_data/json/' + req.params.fileName, (err, data) => {
                if(err) throw err;
                console.log(JSON.parse(data))
                res.send(JSON.parse(data))
            })
        } else {
            console.log('xlsx')
        }
    }
}



module.exports = Chart