const mysql=require('mysql');

const con=mysql.createPool({
    host:'localhost',
    user:'root',
    password:'',
    database:'blog',
    connectionLimit:10
    
})
module.exports=con;
