const express = require('express');
const router = express.Router();

const voitures = [
    { id: 1, name: "clio" },
    { id: 2, name: "megane" },
    { id: 3, name: "range" }
];

// Créer un API pour ajouter une voiture au tableau voiture
router.post('/', (req, res) => {
    const newVoiture = {
        id: voitures.length + 1,
        name: req.body.name,
    };
    voitures.push(newVoiture);
    res.status(201).json(newVoiture);
});

// Route pour lister toutes les voitures
router.get('/', (req, res) => {
    res.json(voitures);
});

// Créer un API pour lister une voiture à travers le paramètre passé et un message not found s'il existe pas dans le tableau
router.get('/:voitureID', (req, res) => {
    const id = Number(req.params.voitureID);
    const voiture = voitures.find(voiture => voiture.id === id);

    if (!voiture) {
        return res.status(404).send('Voiture not found');
    }
    res.json(voiture);
});

// Créer un API pour modifier une voiture avec un id spécifique avec une vérification (existe ou non)
router.put('/:voitureID', (req, res) => {
    const id = Number(req.params.voitureID);
    const index = voitures.findIndex(voiture => voiture.id === id);
    if (index === -1) {
        return res.status(404).send('Voiture not found');
    }
    const updateVoiture = {
        id: voitures[index].id,
        name: req.body.name
    };
    voitures[index] = updateVoiture;
    res.status(200).json('Voiture updated'); 
});

// Créer un API pour supprimer une voiture avec un id spécifique avec une vérification avant le supprimer
router.delete('/:voitureID', (req, res) => {
    const id = Number(req.params.voitureID);
    const index = voitures.findIndex(voiture => voiture.id === id);
    if (index === -1) {
        return res.status(404).send('Voiture not found');
    }
    voitures.splice(index, 1);
    res.status(200).json('Voiture deleted');
});

module.exports = router;
