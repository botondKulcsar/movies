
const { readFile } = require('fs');
const path = require('path')


exports.getAllDemoMovies =  (cb) => 
    readFile(path.join(__dirname, '../../demo-data/movies.json'), 'utf-8', (err, data) => {
        if (err) {
            throw new Error('could not read json file')
        } else {
            const parsedData = JSON.parse(data);
            movies = parsedData.items;
            return cb(movies);
        }
    });
    
    


