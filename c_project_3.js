const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const port = 80;

app.use('/static', express.static('static'))
// app.use(express.urlencoded())
app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {
    const params = {}
    res.status(200).render('home.pug', params);
})

app.get('/contact', (req, res) => {
    const params = {}
    res.status(200).render('contact.pug', params);
})

app.post('/contact', (req, res) => {
    console.log(req.body);
    name = req.body.name
    age = req.body.age
    phone = req.body.phone
    email = req.body.email
    more = req.body.more
    let outputToWrite = `The name of the client is ${name}. ${age} years old. Phone-no. is ${phone}.Email-id is ${email}. More about him/her ${more}`
    fs.writeFileSync('output.txt', outputToWrite)
    const params = {'message': 'Your form has been submitted successfully'}
    res.status(200).render('home.pug', params);
})

app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});