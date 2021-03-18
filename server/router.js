const controllers = require('./controllers');

const router = (app) => {
  app.get('/page1', controllers.page1);
  app.get('/page2', controllers.page2);
  app.get('/page3', controllers.page3);
  app.get('/page4', controllers.page4);
  app.get('/getNameCats', controllers.getNameCats);
  app.get('/getNameDogs', controllers.getNameDogs);
  app.get('/findByNameCats', controllers.searchNameCats);
  app.get('/findByNameDogs', controllers.searchNameDogs);

  app.get('/', controllers.index);

  app.get('/*', controllers.notFound);

  app.post('/setNameCats', controllers.setNameCats);
  app.post('/setNameDogs', controllers.setNameDogs);

  app.post('/updateLastCats', controllers.updateLastCats);
  app.post('/updateLastDogs', controllers.updateLastDogs);
};

// export the router function
module.exports = router;
