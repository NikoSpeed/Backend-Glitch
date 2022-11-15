const express = require('express');
const Contenedor = require('./contenedor.js');

const app = express();

const PORT = 8080

const server = app.listen(PORT, () => {
    console.log(`Servidor prendido escuchando el puerto: ${PORT}`)
})

const contenedor = new Contenedor('./productos.txt')

const getRandom = async () => {
    let lista = await contenedor.getAll()
    return lista[Math.floor(Math.random() * lista.length)]
}


app.get('/', (req, res) => {
    res.send("<h1>Desafío 3</h1>")
})

app.get('/productos', async (req, res) => {
    res.send(await contenedor.getAll())
})

app.get('/productoRandom', async (req, res) => {
    res.send(await getRandom())
})

server.on('error', (err) => {console.log(`====> ERROR: ${err}`)})