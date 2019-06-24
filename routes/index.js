import express from 'express';
import connection from '../conf';

const router = express.Router();


const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
  extended: true
}));


/* GET all weirdteam */
router.get('/all', (req, response) => {
  connection.query('SELECT * FROM weirdteam', (err, results) => {
    if (err) {
      response.sendStatus(500);
    } else {
      response.json(results);
    }
  });
});

/* GET light weirdteam */
router.get('/light', (req, response) => {
  connection.query('SELECT id, firstname, lastname FROM weirdteam', (err, results) => {
    if (err) {
      response.sendStatus(500);
    } else {
      response.json(results);
    }
  });
});

/* GET filters weirdteam */
router.get('/filter', (req, response) => {
  connection.query('SELECT id, firstname, lastname FROM weirdteam WHERE lastname LIKE "%isl%"', (err, results) => {
    if (err) {
      response.sendStatus(500);
    } else {
      response.json(results);
    }
  });
});

router.get('/age', (req, response) => {
  connection.query('SELECT id, firstname, lastname FROM weirdteam WHERE age > 30', (err, results) => {
    if (err) {
      response.sendStatus(500);
    } else {
      response.json(results);
    }
  });
});

/* GET ASC weirdteam */
router.get('/search', (req, response) => {
  const { age } = req.query;
  connection.query('SELECT * FROM weirdteam ORDER BY age ASC', [age], (err, results) => {
    if (err) {
      response.sendStatus(500);
    } else {
      response.json(results);
    }
  });
});

/* GET DESC weirdteam */
router.get('/research', (req, response) => {
  const age = req.params.age;
  connection.query('SELECT * FROM weirdteam ORDER BY age DESC', [age], (err, results) => {
    if (err) {
      response.sendStatus(500);
    } else {
      response.json(results);
    }
  });
});

/* POST sauvegarde nouvelle entité */
router.post('/people', (req, res) => {
  const formData = req.body;
  connection.query('INSERT INTO weirdteam SET ?', formData, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de l'enregistrement d'une personne");
    } else {
      res.sendStatus(200, results);
    }
  });
});

/* Modif personnage id dans les données */
router.put('/personne/:id', (req, res) => {
  const idpersonne = req.params.id;
  const formData = req.body;
  connection.query('UPDATE weirdteam SET ? WHERE id = ?', [formData, idpersonne], (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Erreur lors de la modification d&aposune personne');
    } else {
      res.sendStatus(200);
    }
  });
});

/* Modif personnage id passé en paramètre */
router.put('/bool/:id', (req, res) => {
  const idpeople = req.body.id;
  const formData = req.body;
  connection.query('UPDATE weirdteam SET !? WHERE id = ?', [formData, idpeople], (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Erreur lors de la modification d&aposune personne');
    } else {
      res.sendStatus(200);
    }
  });
});

/* retirement = O ? 1 : 0 */


/* Suppression d'une entité */
router.delete('/people/:id', (req, res) => {
  const idpeople = req.params.id;
  connection.query('DELETE FROM weirdteam WHERE id = ?', [idpeople], (err) => {
    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la suppression d'une personne");
    } else {
      res.sendStatus(200);
    }
  });
});

/* Suppression de toutes les entités dont le bouléen est false */
router.delete('/people/age', (req, res) => {
  const idpeople = req.params.id;
  const boolpeople = req.params.age;
  connection.query('DELETE FROM weirdteam WHERE id = ? AND retirement === 0', [idpeople, boolpeople], (err) => {
    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la suppression d'une personne");
    } else {
      res.sendStatus(200);
    }
  });
});

export default router;
