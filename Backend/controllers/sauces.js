//logique métier

const sauceModel = require("../models/sauces");
const fs = require("fs");

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
    .updateOne({ _id: req.params.id }, { ...sauceObject })
    .then(() => res.status(200).json({ message: "Objet modifié !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.sauceState = (req, res, next) => {
  sauceModel
    .findOne({ _id: req.params.id })
    .then((sauce) => {
      const indexLike = sauce.usersLiked.findIndex(
        (e) => e === req.body.userId
      );
      const indexDislike = sauce.usersDisliked.findIndex(
        (e) => e === req.body.userId
      );

      switch (req.body.like) {
        case 1: // Mon user like la sauce
          if (indexLike <= -1) {
            // On vérifie quand même (même si le cas ne doit pas arriver avec le front) qu'il n'est pas présent dans le tableau (éviter les doublons)
            sauce.usersLiked.push(req.body.userId);
            sauce.likes += 1;
          }
          if (indexDislike > -1) {
            // On vérifier si l'utilisateur est présent dans le tableau des dislikes
            sauce.usersDisliked.splice(indexDislike, 1);
            sauce.dislikes -= 1;
          }
          break;
        case 0:
          if (indexLike > -1) {
            // On vérifie quand même (même si le cas ne doit pas arriver avec le front) qu'il n'est pas présent dans le tableau (éviter les doublons)
            sauce.usersLiked.splice(indexLike, 1);
            sauce.likes -= 1;
          }

          if (indexDislike > -1) {
            // On vérifier si l'utilisateur est présent dans le tableau des dislikes
            sauce.usersDisliked.splice(indexDislike, 1);
            sauce.dislikes -= 1;
          }
          break;
        case -1:
          if (indexLike > -1) {
            // On vérifie quand même (même si le cas ne doit pas arriver avec le front) qu'il n'est pas présent dans le tableau (éviter les doublons)
            sauce.usersLiked.splice(indexLike, 1);
            sauce.likes -= 1;
          }
          if (indexDislike <= -1) {
            // On vérifier si l'utilisateur est présent dans le tableau des dislikes
            sauce.usersDisliked.push(req.body.userId);
            sauce.dislikes += 1;
          }

          break;
      }

      console.log("sauce", sauce);

      sauceModel
        .updateOne(
          { _id: req.params.id },
          {
            likes: sauce.likes,
            dislikes: sauce.dislikes,
            usersLiked: sauce.usersLiked,
            usersDisliked: sauce.usersDisliked,
          }
        )
        .then((result) => {
          result ? res.status(200).json(result) : res.status(401).json(null);
        })
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(400).json({ error }));
};

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
  sauceModel
    .findOne({ _id: req.params.id })
    .then((thing) => {
      const filename = thing.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        sauceModel
          .deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "Objet supprimé !" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};
