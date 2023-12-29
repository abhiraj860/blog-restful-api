const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://abhiaditya860:ZHXUrjX1q1Rg18RV@cluster0.xnayn8w.mongodb.net/blogapi');

// Define schemas
const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    blogs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blogs'
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comments'
    }] 
});


const BlogSchema = new mongoose.Schema({
    title: String,
    author: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Users'
    },
    content: String
});

const CommentSchema = new mongoose.Schema({
    text: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    blog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blogs'
    }
});

const User = mongoose.model('Users', UserSchema);
const Blog = mongoose.model('Blogs', BlogSchema);
const Comment = mongoose.model('Comments', CommentSchema);

module.exports = {
    User,
    Blog,
    Comment
}


