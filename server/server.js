const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 4000;
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(require("./router/routes"));
app.listen(PORT, ()=>{
    console.log(`Server has been started`);
})
