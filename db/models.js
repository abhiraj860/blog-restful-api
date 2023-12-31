const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://abhiaditya860:ZHXUrjX1q1Rg18RV@cluster0.xnayn8w.mongodb.net/blogapi');

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

const CommentSchema = new mongoose.Schema({
    commentor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    text: String,
    blogPost: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
    }
});

const User = mongoose.model('User', UserSchema);
const Blog = mongoose.model('Blog', BlogSchema);
const Comment = mongoose.model('Comment', CommentSchema);

module.exports = {
    User,
    Blog,
    Comment
};


