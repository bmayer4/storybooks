const {authRequired} = require('../helpers/auth');
const mongoose = require('mongoose');
const Story = mongoose.model('Story');

module.exports = (app) => {

    app.get('/stories', (req, res) => {
        Story.find({ status: 'public' }).populate('user').sort({ date: -1 }).then((stories) => {
            res.render('stories/index', { stories: stories });
        });
    });

    app.get('/stories/add', authRequired, (req, res) => {
        res.render('stories/add');
    });

    app.post('/stories', (req, res) => {
        console.log(req.body);  

        let allowComments; //allowComments will be 'on' if checked, not be there AT ALL if unchecked (and body is in <p> due to wysiwyg editor)

        req.body.allowComments ? allowComments = true : allowComments = false;
        new Story({
            title: req.body.title,
            body: req.body.body,
            status: req.body.status,
            allowComments: allowComments,
            user: req.user.id,

        }).save().then((story) => {
            res.redirect(`/stories/show/${story._id}`);
        });
    
    });

    app.get('/stories/show/:id', (req, res) => {
        const id = req.params.id;

        Story.findOne({ _id: id}).populate('user').populate('comments.commentUser').then((story) => {
            //console.log('%%%%%%   ', story.comments, 'END');  //populates all comment users
            if (story.status === 'public') {
                res.render('stories/show', { story: story });
                return;
            }
            if (req.user) {
                console.log(typeof req.user.id);  //string
                console.log(typeof story.user._id);  //object
                if (req.user.id == story.user._id) {  
                    res.render('stories/show', { story: story });
                    return;
                } 
            }
            res.redirect('/stories');
        });
    });


    app.get('/stories/edit/:id', authRequired, (req, res) => {
        const id = req.params.id;

        Story.findOne({ _id: id, user: req.user.id}).then((story) => {
            if (!story) {
                console.log('nice try');
                res.redirect('/stories');
                return;
            }

            res.render('stories/edit', { story: story });
        });
    });

    app.put('/stories/:id', authRequired, (req, res) => {
        const id = req.params.id;

        let allowComments; 
        req.body.allowComments ? allowComments = true : allowComments = false;

        let editedStory = {
            title: req.body.title,
            body: req.body.body,
            status: req.body.status,
            allowComments: allowComments
            };

        Story.findOneAndUpdate({ _id: id}, { $set: editedStory}, {new: true}).then((story) => {
            if (!story) {
                res.redirect('/dashboard');
                return
            }

            res.redirect('/dashboard');
        });
    });

    app.delete('/stories/:id', authRequired, (req, res) => {
        const id = req.params.id;

        Story.findOneAndRemove({ _id: id }).then((story) => {
            if (!story) {
                res.redirect('/dashboard');
                return;
            }
                res.redirect('/dashboard');
        });
    });

    app.post('/stories/comment/:id', authRequired, (req, res) => {
        const id = req.params.id;
        Story.findOne({ _id: id}).then((story) => {
            story.comments.unshift({
                commentBody: req.body.commentBody,
                commentUser: req.user.id
            });
            
            story.save().then((story) => {
                if (!story) {
                    res.redirect(`/stories/show/${story._id}`);
                    return;
                }
                res.redirect(`/stories/show/${story._id}`);
            })
        })
    });

    app.get('/stories/user/:userId', (req, res) => {
        const userId = req.params.userId;
        Story.find({ user: userId, status: 'public' }).populate('user').then((stories) => {
            if (!stories) {

            }
            res.render('stories/index', {stories: stories});
        });
    });

    app.get('/stories/my', authRequired, (req, res) => {
        Story.find({ user: req.used._id }).then((stories) => {
            res.render('stories/index', {stories: stories});
        });
    });

}