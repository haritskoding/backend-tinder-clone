import express from "express";
import mongoose from "mongoose";
import Cards from './models/dbCards.js';
import Cors from "cors";

//App config
const app = express();
const port = process.env.PORT || 8081;
const connection_url = 'mongodb+srv://aris:aris2121!@cluster0.dh4z2.mongodb.net/Tinder?retryWrites=true&w=majority'

//Middleware
app.use(express.json());
app.use(Cors());

//DB Config
mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then((e) => console.log('sukses'))
    .catch((err) => console.log(err))

//Api Endpoints
app.get("/", (req, res) =>
    res.status(200).send("hallo")
);

app.post('/tinder/cards', (req, res) => {
    const dbCard = req.body;
    Cards.create(dbCard, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data)
        }
    })
});

app.get('/tinder/cards', (req, res) => {
    Cards.find((err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data)
        }
    })
})

//Listener
app.listen(port, () => console.log(`server running on ${port}`))