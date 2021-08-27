const MoviePost = require('../../models/moviePost.model')

exports.createMoviePost = async (postData) => {
    try {
        const newPost = new MoviePost(postData);
        const savedPost = await newPost.save();
        return savedPost;
    } catch (error) {
        console.error(error.message);
    }
}

exports.getPostsByUserOrMovieId = (query=null) => MoviePost.find(query);

exports.deleteOne = (id) => MoviePost.findByIdAndRemove(id);

exports.updateOne = (id, payload) => MoviePost.findByIdAndUpdate(id, payload, { new: true });