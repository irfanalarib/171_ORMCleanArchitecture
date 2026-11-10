const db = require('../models');

async function getAllKomik(req, res) {
    try {
        const komik = await db.Komik.findAll();
        res.status(200).json(komik);
    } catch (err) {
        console.error('Error fetching komik:', err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function getKomikById(req, res) {
    const { id } = req.params;
    try {
        const komik = await db.Komik.findByPk(id);
        if (!komik) {
            return res.status(404).json({ error: 'Komik not found' });
        }
        res.status(200).json(komik);
    } catch (err) {
        console.error('Error fetching komik:', err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function createKomik(req, res) {
    const { judul, description, author } = req.body;
    try {
        if (!judul) {
            return res.status(400).json({ error: 'Judul is required' });
        }
        const newKomik = await db.Komik.create({ 
            judul, description, author 
        });
        res.status(201).json(newKomik);
    } catch (err) {
        console.error('Error creating komik:', err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function updateKomik(req, res) {
    const { id } = req.params;
    const { judul, description, author } = req.body;
    try {
        const komik = await db.Komik.findByPk(id);
        if (!komik) {
            return res.status(404).json({ error: 'Komik not found' });
        }
        if (judul !== undefined) komik.judul = judul;
        if (description !== undefined) komik.description = description;
        if (author !== undefined) komik.author = author;
        await komik.save();
        res.status(200).json(komik);
    } catch (err) {
        console.error('Error updating komik:', err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function deleteKomik(req, res) {
    const { id } = req.params;
    try {
        const komik = await db.Komik.findByPk(id);
        if (!komik) {
            return res.status(404).json({ error: 'Komik not found' });
        }
        await komik.destroy();
        res.status(200).json({ message: 'Komik deleted successfully' });
    } catch (err) {
        console.error('Error deleting komik:', err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    getAllKomik,
    getKomikById,
    createKomik,
    updateKomik,
    deleteKomik
};