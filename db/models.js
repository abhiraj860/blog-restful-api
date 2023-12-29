const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL);

// Define schemas
const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
});


const BlogSchema = new mongoose.Schema({
    title: String,
    content: String,
    tags: [String],
    author: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }
});

const User = mongoose.model('User', UserSchema);
const Blog = mongoose.model('Blog', BlogSchema);

module.exports = {
    User,
    Blog
};


