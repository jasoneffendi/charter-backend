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
    }

    static readData(req,res) {
        if(req.params.fileName[req.params.fileName.length - 1] == "n") {
            console.log('json')
            fs.readFile('./mined_data/json/' + req.params.fileName, (err, data) => {
                if(err) throw err;
                console.log(JSON.parse(data))
                res.send({
                    data: JSON.parse(data),
                    status: 200
                })
            })
        } else if(req.params.fileName[req.params.fileName.length - 1] == "x"){
            console.log('xlsx')
            res.send({
                data: req.params.fileName,
                status: 200
            })
        } else {
            res.send({
                err: 'File not found',
                status: 404
            })
        }
    }
}



module.exports = Chart