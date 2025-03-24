const express = require('express');
const app = express();
const port = 3000
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const jobRouter = require('./routers/job');
const authRouter = require('./routers/auth');
const bodyParser = require('body-parser');
const path = require('path');

dotenv.config();

mongoose.connect(process.env.MONGO_URL)
    .then(()=> console.log('connect'))
    .catch(err => console.log(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/jobs', jobRouter);

app.use('/api/users', authRouter);

// Phục vụ file tĩnh từ thư mục "public"
app.use(express.static(path.join(__dirname, 'public')));

// Điều hướng tất cả request khác về index.html (cho frontend SPA)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(process.env.PORT || port, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})