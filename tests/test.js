const newman = require('newman');

jest.setTimeout(15000); 

test('Test Postman collections', async () => {
  await new Promise((resolve, reject) => {
    newman.run({
      collection: require('./backend-association-stats.json'),
      environment: require('./env/gcloud-env.json'),
    }, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });

  await new Promise((resolve, reject) => {
    newman.run({
      collection: require('./backend-projection-homes-stats.json'),
      environment: require('./env/gcloud-env.json'),
    }, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });

  await new Promise((resolve, reject) => {
    newman.run({
      collection: require('./backend-phone-line-stats.json'),
      environment: require('./env/gcloud-env.json'),
    }, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
});
