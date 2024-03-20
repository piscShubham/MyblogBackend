
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
       
        const page = req.query.page || 1;
        const perPage = parseInt(req.query.perPage) || 10; // Ensure perPage is parsed as an integer
        const offset = (page - 1) * perPage;

        con.query('select count(*) as totalitem from blogdetails ',(err,blogitem)=>{
            if(err){
                throw err;
            }
         
            else{
                let totalitem=blogitem[0].totalitem
            
            console.log(totalitem)
        

          
            
            con.query('SELECT * FROM blogdetails LIMIT ? OFFSET ?', [perPage, offset], (err, result) => {
                if (err) {
                    throw err;
                } else {
                    res.json({
                        totalitem:totalitem,
                        currentpage:page,
                        perPage:perPage,
                        data:result
                    });
                }
            });
        }
        })
    }

}

module.exports={createBlog};