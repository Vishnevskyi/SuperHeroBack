const db = require("../database/database");
function validator(checkFun, doOnTrue, doOnFalse) {
    if (typeof checkFun != "function" || typeof doOnTrue != "function" || typeof doOnFalse != "function") throw new Error("not a function");
    if (checkFun()) {
        return doOnTrue();
    } else {
        return doOnFalse();
    }
}
exports.create = (req, res) => {
    let name = validator(() => req.body.nickname === "" || req.body.nickname === undefined, () => "", () => `${req.body.nickname}`);
    let real = validator(() => req.body.real === "" || req.body.real === undefined, () => "", () => `${req.body.real}`);
    let descript = validator(() => req.body.descript === "" || req.body.descript === undefined, () => "", () => `${req.body.descript}`);
    let power = validator(() => req.body.power === "" || req.body.power === undefined, () => "", () => `${req.body.power}`);
    let catch_phrase = validator(() => req.body.catch_phrase === "" || req.body.catch_phrase === undefined, () => "", () => `${req.body.catch_phrase}`);
    if (name === '' || nick === '')
    {
        return res.status(200).json({
            message: "Заповніть усі поля"
        })
    }
    db.connection.query(`SELECT * FROM superhero WHERE real_name = '${real}'`, (error, result) => {
        if (result.length > 0) {
            return res.status(200).json({
                message: "Такий герой вже існує"
            })
        }
        db.connection.query(`INSERT INTO superhero (nickname, real_name, origin_description,superpowers, catch_phrase) VALUES ('${name}','${real}','${descript}','${power}', '${catch_phrase}')`, (err, res_insert) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: "Помилка"
                })
            }
            return res.status(500).json({
                message: "Успішно"
            })
        })
    })
}