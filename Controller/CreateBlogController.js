
const { execute } = require("../Database/Connection");

const createBlog={
    Blog: async (req,res)=>{
        const data=req.body;

        const query='insert into blogdetails set ?';

        const result= await execute(query,data);

        res.send(result);
        console.log(result)
    }
}

module.exports={createBlog};