const express =require('express');
const app = express();
const voituresRoutes = require('./routes/voitures');

app.use(express.json());
app.listen(5000, () => {
    console.log("server is listening on port 5000")
});

app.use(express.json());
app.use('/api/voitures', voituresRoutes); 

app.get('/', (req, res) => {
    res.send("Welcome");
});

