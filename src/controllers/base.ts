import * as M from 'mongoose';
import * as Ex from 'express';

abstract class BaseCtrl {
  protected model: M.Model<any>;
  protected baseRouterURI: string;
  protected baseRouterURIPlural: string;

  constructor(schemaModel: M.Model<M.Document>, baseuri: string) {
    this.model = schemaModel;
    this.baseRouterURI = baseuri;
    this.baseRouterURIPlural = baseuri + 's';
  }

  public setRoutes(router: Ex.Router) {
    router.route(`/${this.baseRouterURIPlural}`).get(this.getAll);
    router.route(`/${this.baseRouterURIPlural}/count`).get(this.count);
    router.route(`/${this.baseRouterURI}/:id`).put(this.update);
    router.route(`/${this.baseRouterURI}/:id`).delete(this.delete);
    router.route(`/${this.baseRouterURI}/:id`).get(this.get);
    router.route(`/${this.baseRouterURI}`).post(this.insert);
    
  }

  // Get all
  getAll = (req, res) => {
    this.model.find({}, (err, docs) => {
      if (err) { return console.error(err); }
      res.status(200).json(docs);
    });
  }

  // Count all
  count = (req, res) => {
    this.model.count((err, count) => {
      if (err) { return console.error(err); }
      res.status(200).json(count);
    });
  }

  // Insert
  insert = (req, res) => {
    const obj = new this.model(req.body);
    obj.save((err, item) => {
      // 11000 is the code for duplicate key error
      if (err && err.code === 11000) {
        res.sendStatus(400);
      }
      if (err) {
        return console.error(err);
      }
      res.status(200).json(item);
    });
  }

  // Get by id
  get = (req, res) => {
    this.model.findOne({ _id: req.params.id }, (err, item) => {
      if (err) { return console.error(err); }
      res.status(200).json(item);
    });
  }

  
  // Update by id
  update = (req, res) => {
    this.model.findOneAndUpdate({ _id: req.params.id }, req.body, (err,item) => {
      if (err) { return console.error(err); }
      res.status(200).json(item);
    });
  }

  // Delete by id
  delete = (req, res) => {
    this.model.findOneAndRemove({ _id: req.params.id }, (err) => {
      if (err) { return console.error(err); }
      res.sendStatus(200);
    });
  }
}

export default BaseCtrl;
