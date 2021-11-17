const db = require("../database/database");
function validator(checkFun, doOnTrue, doOnFalse) {
    if (typeof checkFun != "function" || typeof doOnTrue != "function" || typeof doOnFalse != "function") throw new Error("not a function");
    if (checkFun()) {
        return doOnTrue();
    } else {
        return doOnFalse();
    }
}
exports.changeImg = (req, res) => {
    if (!req.file) {
        res.status(500).json({
            message: "Не вибрано зображення"
        })
    }
    else if (req.body.id === '') {
        res.status(500).json({
            message: "Помилка"
        })
    }
    else {
        db.query(`UPDATE superhero SET images = '${req.file.destination + req.file.filename}' WHERE id = '${req.body.id}'`, (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({
                    message: "Помилка"
                })
            }
            else {
                res.status(200).json({
                    message: "Успішно"
                })
                console.log(result);
            }
        })
    }
}
exports.create = (req, res) => {
    let name = validator(() => req.body.nickname === "" || req.body.nickname === undefined, () => "", () => `${req.body.nickname}`);
    let real = validator(() => req.body.real === "" || req.body.real === undefined, () => "", () => `${req.body.real}`);
    let descript = validator(() => req.body.descript === "" || req.body.descript === undefined, () => "", () => `${req.body.descript}`);
    let power = validator(() => req.body.power === "" || req.body.power === undefined, () => "", () => `${req.body.power}`);
    let catch_phrase = validator(() => req.body.catch_phrase === "" || req.body.catch_phrase === undefined, () => "", () => `${req.body.catch_phrase}`);
    descript = descript.replace(/['"]+/g, "`");
    name = name.replace(/['"]+/g, "`");
    real = real.replace(/['"]+/g, "`");
    power = power.replace(/['"]+/g, "`");
    catch_phrase = catch_phrase.replace(/['"]+/g, "`");
    if (name === '' || real === '' || !req.file) {
        return res.status(200).json({
            message: "Заповніть усі поля та виберіть файл потрібного форматуі"
        })
    }
    db.query(`SELECT * FROM superhero WHERE real_name = '${real}'`, (error, result) => {
        if (result.length > 0) {
            return res.status(200).json({
                message: "Такий герой вже існує"
            })
        }
        db.query(`INSERT INTO superhero (nickname, real_name, origin_description,superpowers, catch_phrase,images) VALUES ('${name}','${real}','${descript}','${power}', '${catch_phrase}', '${req.file.destination + req.file.filename}')`, (err, res_insert) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: "Помилка"
                })
            }
            return res.status(200).json({
                message: "Успішно"
            })
        })
    })
}
exports.delete = (req, res) => {
    db.query(`DELETE FROM superhero WHERE id = '${req.body.id}'`, (err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Помилка"
            })
        }
        return res.status(200).json({
            message: "Успішно"
        })
    })
}
exports.update = (req, res) => {
    if (req.body.tab === "" || req.body.id === "" || req.body.value === "") {
        return res.status(500).json({
            message: "Заповніть, будь ласка, поле для редагування"
        })
    }
    req.body.value = req.body.value.replace(/'/g, "`");
    let query = `UPDATE superhero SET ${req.body.tab} = '${req.body.value}' WHERE id = ${req.body.id}`;
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Помилка" });
        }
        return res.status(200).json({ message: "Успішно" });
    })
}
exports.read = (req, res) => {
    db.query("Select * FROM superhero", (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Помилка" });
        }
        return res.status(200).json(result);
    })
}
exports.imgRemove = (req, res) => {
    db.query(`UPDATE superhero SET images = '${null}' WHERE id = '${req.body.id}'`, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Помилка"
            })
        }
        else {
            console.log(result);
            return res.status(200).json({
                message: "Успішно"
            })
        }
    })
}