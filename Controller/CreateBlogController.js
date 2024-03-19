
const { response } = require("express");
const { execute } = require("../Database/Connection");
const con=require('../Database/config')
const createBlog={
    Blog: async (req,res)=>{
        const data=req.body;

        const query='insert into blogdetails set ?';

        const result= await execute(query,data);

        res.send(result);
        console.log(result)
    },
    getBlog:async(req,res)=>{
        con.query('select* from blogdetails',(err,result,fieldset)=>{
            if(err){
                throw err;

            }
            else{
                 res.json(result);
            }
        })
    }
}

module.exports={createBlog};