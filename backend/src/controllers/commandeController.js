const { Commande, Plat } = require('../models/index');

exports.createCommande = async (req, res) => {
  try {
    const { platsSelectionnes } = req.body; 

    if (!platsSelectionnes || !Array.isArray(platsSelectionnes) || platsSelectionnes.length === 0) {
      return res.status(400).json({ message: "Veuillez sélectionner au moins un plat." });
    }

    const plats = await Plat.findAll({
      where: { id: platsSelectionnes }
    });

    if (plats.length !== platsSelectionnes.length) {
      return res.status(400).json({ message: "Un ou plusieurs plats sélectionnés sont introuvables." });
    }

    let totalCalculé = 0;
    plats.forEach(plat => {
      totalCalculé += parseFloat(plat.prix);
    });
    const nouvelleCommande = await Commande.create({
      total: totalCalculé,
      statut: 'En attente'
    });
    await nouvelleCommande.addPlats(plats);

    const commandeComplete = await Commande.findByPk(nouvelleCommande.id, {
      include: [{ model: Plat, as: 'plats', through: { attributes: [] } }]
    });

    return res.status(201).json(commandeComplete);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur lors de la création de la commande." });
  }
};
exports.getAllCommandes = async (req, res) => {
  try {
    const commandes = await Commande.findAll({
      include: [{ model: Plat, as: 'plats', through: { attributes: [] } }],
      order: [['created_at', 'DESC']]
    });
    return res.status(200).json(commandes);
  } catch (error) {
    return res.status(500).json({ message: "Erreur lors de la récupération des commandes." });
  }
};