const sqlite3 = require('sqlite3').verbose()
const csv=require('csvtojson')


const dbPath='./migrate/archives.db'
const companyInfo='./migrate/companyinfo.csv'
const stockPrices='./migrate/prices.csv'


var db = new sqlite3.Database(dbPath)


db.serialize(function () {
  csv().fromFile(stockPrices)
  .on('csv',(csvRow)=>{
    stmt = "INSERT INTO price_" + csvRow[1] + " VALUES ('" + csvRow[0] + "'," + csvRow[2] + "," + csvRow[3] + "," + csvRow[4] + "," + csvRow[5] + "," + csvRow[6] + ")"
    // console.log(stmt)
    db.run(stmt)
  })
  .on('done', (error) => {
    console.log('---->  populating prices tables done.')
  })
})

module.exports = db;


