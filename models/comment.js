const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
        commentBody: {
            type: String,
            required: true
        },
        commentDate: {
            type: Date,
            default: Date.now
        },
        commentUser: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
});

module.exports = CommentSchema;