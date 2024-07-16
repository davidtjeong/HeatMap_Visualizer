const express = require('express');
const cors = require('cors');

const port = 3200;

const app = express();

app.use(cors());

app.get('/test', (req, res) => {
    res.send({ 
        data : "This is the data, with cors now"
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})