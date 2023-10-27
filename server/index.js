const express = require('express'); 
const app = express(); 
const cors = require("cors");
const port = 5000;
const dbConnect = require("./db/dbConnect");
const path = require('path');
const bodyParser = require('body-parser')
const dotenv =  require("dotenv");
dotenv.config();

dbConnect();
app.set('trust proxy', 1);
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(bodyParser.urlencoded({extended: true}));

const authRoute = require("./routes/auth.js");
const catalogRoute = require("./routes/catalog");
const distributorRoute = require("./routes/distributor");
const documentRoute = require("./routes/document");


app.use(authRoute);
app.use(catalogRoute);
app.use(distributorRoute);
app.use(documentRoute);




app.listen(process.env.PORT || port, () => {
    console.log(`Listening on port ${port}`);
}) 