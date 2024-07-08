const express = require("express");
const cors = require("cors");
const exphbs = require("express-handlebars");
const helmet = require("helmet");
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.use(express.static("./app/public", {
    etag: true,
    lastModified: true,
}));

app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'", "https://api.firstoken-staging.co", "https://api.firstoken.co", "https://cdn.firstoken.co", "https://cdnjs.cloudflare.com"],
        frameSrc: ["'self'", "*"],
        scriptSrc: ["'self'", "'unsafe-inline'", "https://captures.firstoken-staging.co", "https://captures.firstoken.co", "https://cdn.firstoken.co", "https://cdnjs.cloudflare.com"],
        frameAncestors: ["'self'", "https://captures.firstoken-staging.co", "https://captures.firstoken.co"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"]
    },
}));

app.set("view engine", ".hbs");
app.set("views", "./app/views");
app.engine(".hbs", exphbs.engine({
    extname: ".hbs",
    partialsDir: ["./app/partials"],
}));

app.get("/sdk", (req, res) => {
    res.render("sdk", {
        layout: false,
        page: "SDK",
        title: "SDK",
        key: process.env.KEY,
        env: process.env.ENV
    });
});

app.listen(3000, () => {
    console.log("Server listening on port", 3000);
});
