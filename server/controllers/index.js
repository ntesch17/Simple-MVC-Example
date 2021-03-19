// pull in our models. This will automatically load the index.js from that folder
const models = require('../models');
const Cat = models.Cat.CatModel;
const Dog = models.Dog.DogModel;


// default fake data so that we have something to work with until we make a real Cat
const defaultData = {
    name: 'unknown',
    bedsOwned: 0,
};

const defaultData2 = {
    name: 'unknown',
    breed: 'unknown',
    age: 0,
};

let lastAddedCats = new Cat(defaultData);
let lastAddedDogs = new Dog(defaultData2);

const hostIndex = (req, res) => {
    res.render('index', {
        currentName: `Cat: ${lastAddedCats.name} Dog: ${lastAddedDogs.name}}` ,
        title: 'Home',
        pageName: 'Home Page',
    });
};

const readAllCats = (req, res, callback) => {
    Cat.find(callback).lean();
};

const readAllDogs = (req, res, callback) => {
    Dog.find(callback).lean();
};

const readCat = (req, res) => {
    const name1 = req.query.name;

    const callback = (err, doc) => {
        if (err) {
            return res.status(500).json({ err });
        }

        return res.json(doc);
    };

    Cat.findByName(name1, callback);
};

const readDog = (req, res) => {
    const name1 = req.query.name;

    const callback = (err, doc) => {
        if (err) {
            return res.status(500).json({ err });
        }

        return res.json(doc);
    };

    Dog.findByName(name1, callback);
};

const hostPage1 = (req, res) => {
    const callback = (err, docs) => {
        if (err) {
            return res.status(500).json({ err });
        }
        return res.render('page1', { cats: docs })
    }
    readAllCats(req, res, callback);
};

const hostPage2 = (req, res) => {
    res.render('page2');
};


const hostPage3 = (req, res) => {
    res.render('page3');
};

const hostPage4 = (req, res) => {
    const callback = (err, docs) => {
        if (err) {
            return res.status(500).json({ err });
        }
        return res.render('page4', { dogs: docs })
    }
    readAllDogs(req, res, callback);
};

const getNameCats = (req, res) => {
    res.json({ name: lastAddedCats.name });
};

const setNameCats = (req, res) => {
    if (!req.body.name || !req.body.beds) {
        return res.status(400).json({ error: 'firstname,lastname and beds are all required' });
    }

    const name = `${req.body.name}`;

    const catData = {
        name,
        bedsOwned: req.body.beds,
    };

    const newCat = new Cat(catData);

    const savePromise = newCat.save();

    savePromise.then(() => {
        lastAddedCats = newCat;

        res.json({
            name: lastAddedCats.name,
            beds: lastAddedCats.bedsOwned,
        });
    });

    savePromise.catch((err) => {
        res.status(500).json({ err });
    });

    return res;
};

const searchNameCats = (req, res) => {
  lastAddedCats.bedsOwned++;
    if (!req.query.name) {
        return res.status(400).json({ error: 'Name is required to perform a search' });
    }

    return Cat.findByName(req.query.name, (err, doc) => {
        if (err) { return res.status(500).json({ err }); }

        if (!doc) {
            return res.json({ error: 'No Cats Found' });
        }

        return res.json({
            name: doc.name,
            beds: doc.bedsOwned,
        });
    });
};

const updateLastCats = (req, res) => {
    lastAddedCats.bedsOwned++;

    const savePromise = lastAddedCats.save();

    savePromise.then(() => {
        res.json({
            name: lastAddedCats.name,
            beds: lastAddedCats.bedsOwned,
        });
    });

    savePromise.catch((err) => {
        res.status(500).json({ err });
    })
};

const getNameDogs = (req, res) => {
    res.json({ name: lastAddedDogs.name });
};

const setNameDogs = (req, res) => {
    if (!req.body.name || !req.body.breed || !req.body.age) {
        return res.status(400).json({ error: 'Name, breed and age are all required' });
    }

    const name = `${req.body.name}`;
    const breed = `${req.body.breed}`;

    const dogData = {
        name,
        breed,
        age: req.body.age,
    };

    const newDog = new Dog(dogData);

    const savePromise = newDog.save();

    savePromise.then(() => {
        lastAddedDogs = newDog;

        res.json({
            name: lastAddedDogs.name,
            breed: lastAddedDogs.breed,
            age: lastAddedDogs.age,
        });
    });

    savePromise.catch((err) => {
        res.status(500).json({ err });
    });

    return res;
};

const searchNameDogs = (req, res) => {
  lastAddedDogs.age++;
    if (!req.query.name) {
        return res.status(400).json({ error: 'Name is required to perform a search' });
    }

    return Dog.findByName(req.query.name, (err, doc) => {
        if (err) { return res.status(500).json({ err }); }

        if (!doc) {
            return res.json({ error: 'No Dogs Found' });
        }

        return res.json({
            name: doc.name,
            breed: doc.breed,
            age: doc.age,
        });
    });
};

const updateLastDogs = (req, res) => {
    lastAddedDogs.age++;

    const savePromise = lastAddedDogs.save();

    savePromise.then(() => {
        res.json({
            name: lastAddedDogs.name,
            beds: lastAddedDogs.breed,
            age: lastAddedDogs.age,
        });
    });

    savePromise.catch((err) => {
        res.status(500).json({ err });
    })
};

const notFound = (req, res) => {
    res.status(404).render('notFound', {
        page: req.url,
    });
};

module.exports = {
    index: hostIndex,
    page1: hostPage1,
    page2: hostPage2,
    page3: hostPage3,
    page4: hostPage4,
    readCat,
    readDog,
    getNameCats,
    setNameCats,
    updateLastCats,
    searchNameCats,
    getNameDogs,
    setNameDogs,
    updateLastDogs,
    searchNameDogs,
    notFound,
};