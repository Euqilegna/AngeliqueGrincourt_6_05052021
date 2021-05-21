//logique métier

const sauceModel = require("../models/sauces");
const fs = require('fs')

exports.getSauces = (req, res, next) => {
  sauceModel
    .find()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.getSaucesById = (req, res, next) => {
  sauceModel
    .findOne({ _id: req.params.id })
    .then((result) => {
      result ? res.status(200).json(result) : res.status(401).json(null);
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  const sauce = new sauceModel({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });
  sauce
    .save()
    .then((result) => {
      console.log("result", result);
      result ? res.status(200).json(result) : res.status(401).json(null);
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  sauceModel
    .updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: "Objet modifié !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.sauceState = (req, res, next) => {};

exports.deleteSauce = (req, res, next) => {
  sauceModel
    .deleteOne({ id: req.params.id })
    .then((result) => {
      result
        ? res.status(200).json({ message: "Sauce supprimée" })
        : res.status(401).json(null);
      console.log("result", result);
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
  sauceModel.findOne({ _id: req.params.id })
    .then(thing => {
      const filename = thing.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        sauceModel.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};
