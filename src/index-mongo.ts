import express, {Request, Response} from 'express'
import 'dotenv/config'
import mongoose, { MongoClient } from 'mongodb'

const client = new mongoose.MongoClient(process.env.MONGO_URI!)
await client.connect()
const db = client.db(process.env.mongo_db)                                                  
const app = express()

app.get('/produtos', async (req:Request, res: Response) => {
    const collection = db.collection('produtos')
    const produtos = await collection.find().toArray()
    res.json(produtos)
})
app.use(express.json()) // <-- Adicione esta linha


app.listen(8000, () => {
    console.log('TA RODANDOOOOOOOOOOOOOOOOOOO 8000');
});
