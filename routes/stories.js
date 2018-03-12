const {authRequired} = require('../helpers/auth');
const mongoose = require('mongoose');
const Story = mongoose.model('Story');

module.exports = (app) => {

    app.get('/stories', (req, res) => {
        Story.find({ status: 'public' }).populate('user').then((stories) => {
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

        Story.findOne({ _id: id}).populate('user').then((story) => {
            res.render('stories/show', { story: story });
        });
    });


    app.get('/stories/edit/:id', (req, res) => {
        const id = req.params.id;

        Story.findOne({ _id: id}).then((story) => {
            res.render('stories/edit', { story: story });
        });
    });

}