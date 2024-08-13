const express = require('express');
const app = express();
const port = 3000;

app.use(express.static(__dirname + '/src'));


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/src/index.html');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});