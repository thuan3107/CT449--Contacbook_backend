const express = require("express");
const cors = require("cors");

const setupContactRoutes = require("./app/routes/contact.routes");

const { BadRequestError , errorHandler } = require("./app/errors");

const app = express();

app.use(cors());

//parse requests of content-type - application/json
app.use(express.json());

//parse requests of content-type - aplication/X-www-form-urlencoded
app.use(express.urlencoded({extended: true }));

//simple route
app.get("/", (req, res) => {
    res.json({message: "Welcome to contact book application." });
});

setupContactRoutes(app);

// handle 404 response
app.use((req, res, next) => {
    //Code ở đây sẽ chạy khi không có route đucợ định nghĩa nào
    //   khớp với yêu cầu. Gọi next() để chuyển sang middlware xử lý lỗi
    next(new BadRequestError(404, "Resource not found"));
});

app.use((error, req, res, next) => {
    errorHandler.handleError(error, res);
});

module.exports = app;