import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as morgan from 'morgan';
import mongoose = require('mongoose');
import * as path from 'path';

import setRoutes from './routes';

const app = express();
dotenv.load({ path: '.env' });
app.set('port', (process.env.PORT || 3000));

app.use('/public', express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

let mongodbURI;
if (process.env.NODE_ENV === 'test') {
  mongodbURI = process.env.MONGODB_TEST_URI;
} else {
  mongodbURI = process.env.MONGODB_URI;
  app.use(morgan('dev'));
}
mongoose.Promise = global.Promise;
const mongodb = mongoose.connect(mongodbURI);

mongodb.then(() => {
  const db: any = mongoose.connection;
  console.log('Connected to MongoDB on ' + db.host + " in port:" + db.port);

  setRoutes(app);


  app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, './public/error.html'));
  });

  app._router.stack.forEach(function (r) {
    if (r.name == "router") {
      r.handle.stack.forEach(element => {
        if (element.route && element.route.path) {
          console.log(element.route.path + "-" + JSON.stringify(element.route.methods))
        }
      });
    }
    if (r.route && r.route.path) {
      console.log(r.route.path)
    }
  })

  if (!module.parent) {
    app.listen(app.get('port'), () => {
      console.log('Mongoose listening on port ' + app.get('port'));
    });
  }

})
  .catch((err) => {
    console.error(err);
  });

export { app };
