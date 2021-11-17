const db = require("../database/database");

exports.delete = (req,res) => {
    db.connection.query(`DELETE FROM superhero WHERE id = '${req.body.id}'`,(err,result)=>{
        if (err) 
        {
            return res.status(500).json({
                message: "Помилка"
            })
        }
        return res.status(200).json({
            message: "Успішно"
        })
    })
}