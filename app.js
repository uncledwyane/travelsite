const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = new express();
const cors = require('cors');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors())

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: '3306',
    password: 'root',
    database: 'wangbo'
})

connection.connect();



app.get('/alluser', function(req, res){
    connection.query('SELECT * FROM person', function (error, results, fields) {
        if (error) throw error;
        res.json(
            new Result({data: results})
        )
    });
})

app.listen(3000, function (){
    console.log('app listen on port 3000...')
})

function Result({code=1,msg='',data={}}){
    this.code=code;
    this.msg=msg;
    this.data=data;
}