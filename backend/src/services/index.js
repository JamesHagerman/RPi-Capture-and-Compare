var exec = require('child-process-promise').exec;
const memory = require('feathers-memory');

module.exports = function () {
  const app = this; // eslint-disable-line no-unused-vars

  app.use('/images', memory({
    paginate: {
      default: 2,
      max: 4
    }
  }));

  let cmd = 'ls -c ../frontend/public/capture/files | grep -v "\~"';
  exec(cmd)
    .then((result) => {
      // command output is in stdout
      if (result.stderr) {
        console.error('Error reading images:', result.stderr);
        return Promise.reject();
      } else {
        let files = result.stdout.split('\n').filter((file) => {
          return file.length != 0;
        });
        console.log('All images:', JSON.stringify(files, 0, 2));
        return files;
      }
    })
    .then((imageFiles) => {
      return app.service('images').create({
        images: imageFiles
      });
    })
    .then(function(message) {
      console.log('Created message', message);
    })
    .catch(function (err) {
      console.error('ERROR: ', err);
    });

  
};
