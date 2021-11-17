const db = require("../database/database");

exports.update = (req,res) => {
        if (req.body.tab === "" || req.body.id === "" || req.body.value === "")
        {
            return res.status(500).json({
                message: "Заповніть, будь ласка, поле для редагування"
            })
        }
        req.body.value = req.body.value.replace(/'/g, "`");
        let query = `UPDATE superhero SET ${req.body.tab} = '${req.body.value}' WHERE id = ${req.body.id}`;
        db.connection.query(query,(err,result)=>{
        if (err)
        {
            console.log(err);
            return res.status(500).json({message: "Помилка"});
        }
        return res.status(200).json({message: "Успішно"});
        console.log(res);
    })
}