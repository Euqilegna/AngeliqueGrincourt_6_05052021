const express = require('express')

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use('/api/sauces', (req, res, next) => {
    const sauces = [
        {
            id : '',
            userId: '',
            name:'',
            manufacturer:'',
            description:'',
            mainPepper:'',
            imageUrl:'',
            heat:'',
            likes:'',
            dislikes:'',
            usersLiked:'',
            usersDisliked:'',
        }
    ]
    res.status(200).json(sauces)
})
module.exports = app; 