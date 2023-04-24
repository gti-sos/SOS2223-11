const newman = require('newman');

test('Test Postman collections', async () => {
  await new Promise((resolve, reject) => {
    newman.run({
      collection: require('./tests/backend-association-stats.json'),
      environment: require('./tests/env/gcloud-env.json'),
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
      collection: require('./tests/backend-projection-homes-stats.json'),
      environment: require('./tests/env/gcloud-env.json'),
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
      collection: require('./tests/backend-phone-line-stats.json'),
      environment: require('./tests/env/gcloud-env.json'),
    }, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
});
