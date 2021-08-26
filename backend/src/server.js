const express = require('express');
const app = express();
const cors = require('cors');

// routers
const authRouter = require('./controllers/auth/auth.routes');

app.use(cors());

app.use(express.json());

app.use('/api/', authRouter);

app.use((err, req, res, next) => {
    console.error(`ERROR ${err.statusCode}: ${err.message}`)
    res.status(err.statusCode);
    res.json({
        hasError: true,
        message: err.message
    })
});

module.exports = app;
