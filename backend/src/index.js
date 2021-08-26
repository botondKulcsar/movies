const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

require('dotenv').config();

const app = require('./server');
const PORT = process.env.PORT || 3000;

// db connection
const connectionURL = `${process.env.DBTYPE}://${process.env.DBUSER}:${process.env.DBPASS}@${process.env.DBHOST}`;
mongoose
    .connect(connectionURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to DB'))
    .catch((err) => {
        console.error(err);
        process.exit();
    });

app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`));
