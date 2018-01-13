var express = require('express');
const app = express()
const fs = require('fs');
var path = require('path')
var db = require('./utils/connect.js')
const hbs = require('handlebars');
const sqlite3 = require('sqlite3').verbose()



app.use('/static',express.static(path.join(__dirname, '/../client/static')));

const dbPath='./migrate/archives.db'
const companyInfo='./migrate/companyinfo.csv'
const stockPrices='./migrate/prices.csv'


var db = new sqlite3.Database(dbPath)




hbs.registerHelper('CompanyList', function(companies) {
	console.log(companies);
	var companiesFound = "";
	var companiesNotFound = "<div class=\"company-not-found\">No companies found.</div>";
	if(companies.length == 0)
		return companiesNotFound;

	for(var i=0;i<10;i++){

		var company=companies[i];

		console.log(company);
		if(company!=undefined)
			companiesFound+="<div key="+company.symbol+"class=\"company-list-item\" data-key="+company.symbol+"><div class=\"company-name\" data-key="+company.symbol+">"+company.symbol+"<span class=\"fa fa-thumb-tack pinButton\"></span></div></div>"
	}
	return companiesFound;
});


app.get('/', function(req, res){
	db.all('SELECT * FROM companyinfo', (err, rows) => {
        if (err) {
            res.status(500).send(err)
        } else {
        	// console.log(rows);
			let indexTemplate = fs.readFileSync(path.resolve(__dirname+'/../client/static/templates/index.html'),"utf8");
			let compiledTemplate = hbs.compile(indexTemplate);
			// let data = fs.readFileSync(list,"utf8");
			// console.log(compiledTemplate);
			let result = compiledTemplate(rows);
			console.log(result);
			res.send(result);
			// res.sendFile(result);
        }
    });
});

app.listen(3000, function(){
	console.log('listening on port 3000 ..');
})

	