import Person from '../models/person';
import BaseCtrl from './base';
import * as ex from 'express';
import { MongooseDocument, Mongoose, Model } from 'mongoose';

export default class PersonCtrl extends BaseCtrl {
  // model = Person;
  constructor() {
    super(Person, 'person');
  }

  setRoutes(router: ex.Router) {
    router.route(`/bymanager/:userid`).get(this.getByManager);
    router.route(`/${this.baseRouterURIPlural}withmanager`).get(this.getpesronManager);
    super.setRoutes(router);
  }

  //Get By Manager
  getByManager = (req, res) => {
    this.model.find({ manager: req.params.userid }, (err, item: MongooseDocument) => {
      if (err) { return console.error(err); }
      res.status(200).json(item);
    });
  }

  //get all persons with manager
  getpesronManager = (req, res) => {
    this.model.find({}, (err, persons: Model<any>) => {
      Person.populate(persons, {
        path: "manager",
        model: "User"   }, (err, item) => {
        if (err) { return console.error(err); }
        res.status(200).json(item);
      });
    })
  }

}
