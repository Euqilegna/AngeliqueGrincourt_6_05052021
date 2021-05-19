//logique métier

const sauces = require("../models/sauces");

exports.getSauces = (req, res, next) => {
  sauces
    .find()
    .then((result) => {
    res.status(200).json(result);
      console.log("result", result);
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.getSaucesById = (req, res, next) => {
  sauces
    .findOne({ _id: req.params.id })
    .then((result) => {
      result ? res.status(200).json(result) : res.status(401).json(null);
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.createSauce = (req, res, next) => {
  const sauce = new sauces({
    ...req.body,
  });
  sauce
    .save()
    .then((result) => {
      result ? res.status(200).json(result) : res.status(401).json(null);
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.modifySauce = (req, res, next) => {};

exports.sauceState = (req, res, next) => {
};

exports.deleteSauce = (req, res, next) => {
    sauces
    .deleteOne({id: req.params.id})
    .then((result) => {
        result ? res.status(200).json({message: "Sauce supprimée"}) : res.status(401).json(null);
        console.log("result", result);
      })
      .catch((error) => res.status(400).json({ error }));
};
