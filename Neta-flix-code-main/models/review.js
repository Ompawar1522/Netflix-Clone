const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    username: String,
    body: String,
    rating: Number,
    movie_id: Number,
});


module.exports = mongoose.model('Review', reviewSchema);