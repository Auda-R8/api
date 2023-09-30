const express = require('express')
const {v4} = require('uuid')
const path = require('path')
const app = express()

let data = [
    {id: v4(), name: 'Title', value: 'desc', marked: false}
]

app.use(express.json())

app.get('/api/contacts', (req, res) => {
    res.status(200).json(data)
})

app.post('/api/contacts', (req, res) => {
    const contact = {...req.body, id: v4(), marked: false}
    data.push(contact)
    res.status(201).json(contact)
})

app.delete('/api/contacts/:id', (req, res) => {
    data = data.filter(c => c.id !== req.params.id)
    res.status(200).json({mes: 'fggf'})
})

app.put('/api/contacts/:id', (req, res) => {
    const id = data.findIndex(c => c.id === req.params.id)
    data[id] = req.body
    res.json(data[id])
})

app.use(express.static(path.resolve(__dirname, 'client')))
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'index.html'))
})
app.listen(3000, () => console.log('Server has benn started...'))