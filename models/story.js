const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CommentSchema = require('./comment.js');

const StorySchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'public'
    },
    allowComments: {
        type: Boolean,
        default: true
    },
    comments: [CommentSchema],  //subdocument
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    date:{
        type: Date,
        default: Date.now
    }
});

// mongoose.model('Story', StorySchema);  //will create a collection in mlab named "stories"
mongoose.model('Story', StorySchema, 'Stories');  //now "Stories" collection  ....should be lowercase 