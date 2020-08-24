const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

//GET Posts
router.get('/', async (req, res) => {
    const menuTitles = await loadMenuTitlesCollection();
    res.send(await menuTitles.find({}).toArray());
})

// Add Post
router.post('/', async (req, res) => {
    const menuTitles = await loadMenuTitlesCollection();
    await menuTitles.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });

    res.status(201).send();
})

// Delete Post
router.delete('/:id', async (req, res) => {
    const menuTitles = await loadMenuTitlesCollection();
    await menuTitles.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send();
})

async function loadMenuTitlesCollection() {
    const client = await mongodb.MongoClient.connect('mongodb+srv://admin:admin@cluster0.b6l1b.mongodb.net/drawflow?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    return client.db('drawflow').collection('menuTitles');
}

module.exports = router;
