const express = require('express');
const app = express();
const cors = require('cors');

const authenticationByJWT = require('./controllers/auth/authenticate');

// routers
const authRouter = require('./controllers/auth/auth.routes');
const userRouter = require('./controllers/user/user.routes');
const moviePostRouter = require('./controllers/post/moviePost.routes');
const adminRouter = require('./controllers/admin/admin.routes');
const movieRouter = require('./controllers/movie/movie.routes.js')

const adminOnly = require('./controllers/auth/adminOnly');

app.use(cors());

app.use(express.json());

app.use('/api/', authRouter);

app.use('/api/movies', movieRouter);

app.use('/api/users', authenticationByJWT, userRouter);
app.use('/api/movie-posts', moviePostRouter);

app.use('/api/admin',authenticationByJWT, adminOnly, adminRouter)

app.use((err, req, res, next) => {
    console.error(`ERROR ${err.statusCode}: ${err.message}`)
    res.status(err.statusCode);
    res.json({
        hasError: true,
        message: err.message
    })
});

module.exports = app;
