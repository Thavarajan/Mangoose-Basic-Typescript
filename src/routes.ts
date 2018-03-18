import * as express from 'express';
import UserCtrl from "./controllers/user";
import PersonCtrl  from "./controllers/person";
import LangCtrl from "./controllers/language";
import User from "./models/user";
import Person from "./models/person";
import Language from './models/language';


export default function setRoutes(app) {

  const router = express.Router();
  const personCtrl = new PersonCtrl();
  const userCtrl = new UserCtrl();
  const langCtrl = new LangCtrl();

  // Users
  userCtrl.setRoutes(router);

  // Persons
  personCtrl.setRoutes(router);

  //language
  langCtrl.setRoutes(router);
  
  // Apply the routes to our application with the prefix /api
  app.use('/api', router);

}
