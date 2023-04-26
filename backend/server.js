const express = require('express');
const app = express();
const mongoose = require('mongoose');

// for user routes
let routes = require("./routes/userRoutes");
app.use('/', routes);

app.use(express.json());


// Server Connection
const server = app.listen(5000, (error) => {
    if (error)
        console.log(`Their is some Error.....`);
    else
        console.log(`Server is running on PORT: 5000`);
});


// Database Connection 
mongoose.connect("mongodb://localhost:27017/test", { useNewUrlParser: true, useUnifiedTopology: true })
    .then((data) => {
        console.log(`mongodb connected with server : ${data.connection.host}`);
    });


// Unhandeled Promise Rejection
process.on("unhandledRejection", err => {
    console.log(`Error: ${err.message}`);
    console.log(`shutting down the server due to unhandled Promise Rejection`);

    server.close(() => {
        process.exit(1);
    });
});