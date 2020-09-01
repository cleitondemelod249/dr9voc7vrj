const express = require('express');
const app = express();
const bodyParser = require('body-parser');

var mySQL = require('mysql');
const HOST = "ns590.hostgator.com.br";
const USER = "spacebox_hero";
const PASSWD = "herospace";
const DB = "spacebox_hero";

const port = 3000;
const urlBase = '/hero/v2/api/';
const os = require('os');
const network = os.networkInterfaces();
const userInfo = os.userInfo();

var conn = mySQL.createConnection({
    host: HOST,
    user: USER,
    password: PASSWD,
    database: DB
});

function execSQLQuery(sqlQry, res) {
    conn.query(sqlQry, (err, result) => {
        if(err) throw err;
        res.json(result);
    });
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const api = express.Router();

conn.connect((err) => {
    if (err) throw err;
    console.log("MySQL connection is ok");
})

api.get('/', (req, res) => res.json({ message: "NodeJS Server isWorking", method: 'GET', host: "192.168.0.56:3000/", 'urlBase': urlBase, date: new Date(), version: 'v1.0.0.2' }));
api.post('/', (req, res) => res.json({ message: "NodeJS Server isWorking", method: 'POST', host: "192.168.0.56:3000/", 'urlBase': urlBase, date: new Date(), version: 'v1.0.0.2' }));

api.get(urlBase + 'displayAll', (req, res) => {
    //res.json({'name': 'Cleiton Melo', 'age': 22})
    execSQLQuery('SELECT * FROM cli', res);
});

app.use('/', api);
app.listen(port);