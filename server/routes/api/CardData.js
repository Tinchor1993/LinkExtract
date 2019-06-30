const metascraper = require('metascraper')([
  require('metascraper-author')(),
  require('metascraper-date')(),
  require('metascraper-description')(),
  require('metascraper-image')(),
  require('metascraper-logo')(),
  require('metascraper-clearbit-logo')(),
  require('metascraper-publisher')(),
  require('metascraper-title')(),
  require('metascraper-url')(),
  require('metascraper-video')()
]);
  
const got = require('got');

const CardData = require('../../models/CardData');

module.exports = (app) => {
  app.get('/api/data', (req, res, next) => {
    const count = req.param('count');
    const query = req.param('filter_key').trim();
    if(query.length > 0) {
      CardData.find({$text: {$search: query}})
      .skip(count*20)
      .limit(20)
      .exec()
      .then((card_data) => res.json(card_data))
      .catch((err) => next(err));
    }
    else {
      CardData.find()
      .skip(count*20)
      .limit(20)
      .exec()
      .then((card_data) => res.json(card_data))
      .catch((err) => next(err));  
    }    
  });

  app.post('/api/data', function (req, res, next) {
    const targetUrl = req.body.text;
    (async () => {
      const { body: html, url } = await got(targetUrl)
      const metadata = await metascraper({ html, url })
      const card_data = new CardData(metadata);
      card_data.save()
        .then(() => res.json(card_data))
        .catch((err) => next(err));  
      })()    
  });

  app.delete('/api/data/:id', function (req, res, next) {
    CardData.findOneAndRemove({ _id: req.params.id })
      .exec()
      .then((card_data) => res.json())
      .catch((err) => next(err));
  });  
};
