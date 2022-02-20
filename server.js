const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

const ConnectDB = require('./config/db');
ConnectDB();

app.use(express.json());
app.use('/api/files' , require('./routes/file'));
app.use('/files' , require('./routes/show'));
app.use('/files/download' , require('./routes/download'));

app.listen(PORT , () => {
    console.log('Server is listen in port = ', PORT);
})