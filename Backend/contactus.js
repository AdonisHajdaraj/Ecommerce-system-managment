const express = require('express');
const router = express.Router();
const { connectToDatabase } = require('./mongo');
const { ObjectId } = require("mongodb");

router.post('/contactus', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const contactusCollection = db.collection('contactus'); // koleksioni ku ruajmë mesazhet

    const newMessage = {
      userId: req.body.userId,
      name: req.body.name,
      email: req.body.email,
      message: req.body.message,
      createdAt: new Date(),
    };

    const result = await contactusCollection.insertOne(newMessage);

    if (result.insertedId) {
      res.status(201).json({ message: 'Mesazhi u ruajt me sukses!' });
    } else {
      res.status(500).json({ error: 'Gabim gjatë ruajtjes së mesazhit.' });
    }
  } catch (error) {
    console.error("Gabim në API contact:", error);
    res.status(500).json({ error: 'Gabim në server.' });
  }
});


router.get('/contactus', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const contactusCollection = db.collection('contactus');

    const messages = await contactusCollection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    res.status(200).json(messages);
  } catch (error) {
    console.error("Gabim gjatë marrjes së mesazheve:", error);
    res.status(500).json({ error: "Gabim në server." });
  }
});


router.delete('/contactus/:id', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const contactusCollection = db.collection('contactus');
    const result = await contactusCollection.deleteOne({ _id: new ObjectId(req.params.id) });

    if (result.deletedCount === 1) {
      res.status(200).json({ message: "Mesazhi u fshi me sukses." });
    } else {
      res.status(404).json({ error: "Mesazhi nuk u gjet." });
    }
  } catch (error) {
    console.error("Gabim gjatë fshirjes së mesazhit:", error);
    res.status(500).json({ error: "Gabim në server." });
  }
});


module.exports = router;
