import express from 'express'
import mysql from 'mysql2/promise'
import 'dotenv/config'

const app = express()

app.get('/', async (req, res) => {
    if (!process.env.DBHOST) {
        res.status(500).send("DBHOST não está definido nas variáveis de ambiente");
        return;
    }
    if (process.env.DBUSER === undefined) {
        res.status(500).send("DBUSER não está definido nas variáveis de ambiente");
        return;
    }
    if (process.env.DBPASSWORD === undefined) {
        res.status(500).send("DBPASSWORD não está definido nas variáveis de ambiente");
        return;
    }
    if (process.env.DBDATABASE === undefined) {
        res.status(500).send("DBDATABASE não está definido nas variáveis de ambiente");
        return;
    }
    if (process.env.DBPORT === undefined) {
        res.status(500).send("DBPORT não está definido nas variáveis de ambiente");
        return;
    }
    try {
        const conn = await mysql.createConnection({
            host: process.env.DBHOST,
            user: process.env.DBUSER,
            password: process.env.DBPASSWORD,
            database: process.env.DBDATABASE,
            port: Number(process.env.DBPORT)
        });
        res.send("Conexão bem sucedida!");
    } catch (err) {
        res.status(500).send("Erro ao conectar ao banco de dados: " + err);
    }
});

console.log(process.env.DBHOST);

app.listen(8000, () => {
    console.log('server is running on port 8000');
});
