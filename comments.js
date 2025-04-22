// Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to handle comments submission
app.post('/submit-comment', (req, res) => {
    const comment = req.body.comment;
    if (comment) {
        // Append the comment to a file
        fs.appendFile('comments.txt', comment + '\n', (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error saving comment');
            } else {
                res.send('Comment saved successfully');
            }
        });
    } else {
        res.status(400).send('Comment is required');
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});