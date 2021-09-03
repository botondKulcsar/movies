
// const { readFile } = require('fs');
// const path = require('path')


// exports.getAllDemoMovies =  (cb) => 

//     new Promise((res, rej) => {
//         readFile(path.join(__dirname, '../../demo-data/movies.json'), 'utf-8', (err, data) => {
//             if (err) {
//                 rej(err)
//             } else {
//                 const parsedData = JSON.parse(data);
//                 movies = parsedData.items;
//                 res(movies);
//             }
//         });
//     })

const Movie = require('../../models/movie.model')

exports.getTop250Movies = () => Movie.find();

exports.findMovieByIdAndUpdate = (id, payload) => Movie.findByIdAndUpdate(id, payload, { new: true })
    
    
    


