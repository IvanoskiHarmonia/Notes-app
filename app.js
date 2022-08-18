// library that allows connection to the database
const pg = require('pg');


// connect to the database
// Change below this to your own connection string
const connectionString = 'postgresql://postgres:<master_password>@localhost:<port>/<Database_name>'; // it is case sensitive.
// Change above this to your own connection string


const express = require('express');
const bodyParser = require('body-parser');

// create a new express app
const app = express();

// connect to the database
const client = new pg.Client(connectionString);
client.connect();

// This query is here for testing purposes. - if you need to check if you database is connected, you can run this query by entering this url: http://localhost:3000/checkQuery
app.get('/checkQuery', async (req, res) => {
    let resultOfQuery = await client.query('SELECT EXISTS(SELECT * FROM notelist WHERE nid = 1)');
    
    client.query('SELECT EXISTS(SELECT * FROM notelist WHERE nid = 1)', (err, res) => {
        resultOfQuery = res.rows[0].exists;
        console.log('1.resultOfQuery: ', resultOfQuery);
    });
    
    console.log('2.resultOfQuery: ', resultOfQuery.rows[0].exists);
    if(resultOfQuery.rows[0].exists) {
        res.send('true');
    } else {
        res.send('false');
    }
});


// serving static files
app.use(express.static('app'));



// for parsing application/json
app.use(bodyParser.json()); 

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 
//form-urlencoded





// sleep function only works with async/await
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}




// What queries do I need:

    // Post new note and Update note
        app.post('/saveNote', async (req, res) => {
            console.log('req.body: ', req.body);
            console.log('noteId: ', req.body.noteId);
            if(req.body.noteId == '') {
                client.query('INSERT INTO notelist (ntitle, ntext, ndate) VALUES ($1, $2, NOW())', [req.body.noteTitle, req.body.noteText]);
            } else {
                const resultOfQuery = await client.query('SELECT EXISTS(SELECT * FROM notelist WHERE nid = $1)', [req.body.noteId]);
                if(resultOfQuery.rows[0].exists) {
                    client.query('UPDATE notelist SET ntitle = $1, ntext = $2, ndate = now() WHERE nid = $3', [req.body.noteTitle, req.body.noteText, req.body.noteId]);
                } else {
                    client.query('INSERT INTO notelist (ntitle, ntext, ndate) VALUES ($1, $2, NOW())', [req.body.noteTitle, req.body.noteText]);
                }
            }
            await sleep(300);
            res.redirect('/');
        });



    // Delete note
        app.post('/deleteNote', async (req, res) => {
            client.query('DELETE FROM notelist WHERE nid = $1', [req.body.noteId]);
            await sleep(300);
            res.redirect('/');
        });




    // Select all notes
        app.get('/getAllNotes', async (req, res) => {
            console.log('send notes');
            let resultOfQuery = await client.query('SELECT * FROM notelist ORDER BY ndate DESC');
            if(resultOfQuery.rows.length > 0) {
                res.json(resultOfQuery.rows);
            } else {
                res.json("Nothing?" + resultOfQuery);
            }
        });



// bind and listen the connections on the specified host and port
app.listen(3000, () => { console.log('listening on port 3000') });