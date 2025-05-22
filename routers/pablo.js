const express = require('express')
const fs = require('fs')

const router = express.Router()

const file = fs.readFileSync('./data/pablo.json')
const json = JSON.parse(file)

router.route(`/updates`)
    .get((req, res) => {
        res.send(json.data)
    })
    // NOTE: curl -X POST http://localhost:3000/pablos/updates \ -H "Content-Type: application/json" \ -d '{"name": "パブロ・ベッチュー", "specialName": "おもんなショット", "subName": "スプリンクラー"}'
    .post((req, res) => {
        const newPablo = {
            id: json.data.length + 1,
            name: req.body.name,
            specialName: req.body.specialName,
            subName: req.body.subName
        }
        json.data.push(newPablo)
        fs.writeFileSync('./data/pablo.json', JSON.stringify(json))
        res.status(201).send(newPablo)
    })

router.route(`/updates/:id`)
    // NOTE: curl -X DELETE http://localhost:3000/pablos/updates/5
    .delete((req, res) => {
        const id = req.params.id
        const pablo = json.data.find(p => p.id == id)

        if (pablo === -1) {
            return res.status(404).json({ error: 'Data not found' });
        }

        const deleted = json.data.splice(pablo, 1)[0];
        fs.writeFileSync('./data/pablo.json', JSON.stringify(json, null, 2));

        res.json(deleted);
    })

module.exports = router