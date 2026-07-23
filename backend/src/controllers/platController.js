const Plat = require('../models/plat');

exports.getAllPlats = async (req, res) => {
  try {
    const plats = await Plat.findAll({ order: [['created_at', 'DESC']] });
    return res.status(200).json(plats);
  } catch (error) {
    return res.status(500).json({ message: "Erreur lors de la récupération des plats." });
  }
};

exports.getPlatById = async (req, res) => {
  try {
    const plat = await Plat.findByPk(req.params.id);
    if (!plat) {
      return res.status(404).json({ message: "Plat introuvable." });
    }
    return res.status(200).json(plat);
  } catch (error) {
    return res.status(500).json({ message: "Erreur lors de la récupération du plat." });
  }
};

exports.createPlat = async (req, res) => {
  try {
    const { nom, prix, categorie, disponible } = req.body;

    if (!nom || nom.trim() === "" || !categorie || categorie.trim() === "") {
      return res.status(400).json({ message: "Le nom et la catégorie sont obligatoires." });
    }
    if (prix === undefined || prix < 0) {
      return res.status(400).json({ message: "Le prix doit être un nombre positif." });
    }

    const newPlat = await Plat.create({ nom, prix, categorie, disponible });
    return res.status(201).json(newPlat);
  } catch (error) {
    return res.status(500).json({ message: "Erreur lors de la création du plat." });
  }
};

exports.updatePlat = async (req, res) => {
  try {
    const plat = await Plat.findByPk(req.params.id);
    if (!plat) {
      return res.status(404).json({ message: "Plat introuvable." });
    }

    const { nom, prix, categorie, disponible } = req.body;
    if (nom !== undefined && nom.trim() === "") {
      return res.status(400).json({ message: "Le nom ne peut pas être vide." });
    }
    if (categorie !== undefined && categorie.trim() === "") {
      return res.status(400).json({ message: "La catégorie ne peut pas être vide." });
    }
    if (prix !== undefined && prix < 0) {
      return res.status(400).json({ message: "Le prix doit être un nombre positif." });
    }

    await plat.update({ nom, prix, categorie, disponible });
    return res.status(200).json(plat);
  } catch (error) {
    return res.status(500).json({ message: "Erreur lors de la modification du plat." });
  }
};

exports.deletePlat = async (req, res) => {
  try {
    const plat = await Plat.findByPk(req.params.id);
    if (!plat) {
      return res.status(404).json({ message: "Plat introuvable." });
    }
    await plat.destroy();
    return res.status(204).send(); 
  } catch (error) {
    return res.status(500).json({ message: "Erreur lors de la suppression du plat." });
  }
};