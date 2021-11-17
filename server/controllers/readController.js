const db = require("../database/database");

exports.read = (req,res) => {
    db.connection.query("Select * FROM superhero",(err,result)=>{
        if (err)
        {
            console.log(err);
            return res.status(500).json({message: "Помилка"});
        }
        return res.status(200).json(result);
        console.log(res);
    })
}