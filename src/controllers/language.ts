import Language from '../models/language';
import BaseCtrl from './base';
import * as ex from 'express';
import { MongooseDocument, Mongoose, Model } from 'mongoose';

export default class LangCtrl extends BaseCtrl {

    constructor() {
        super(Language, 'lang');
    }

}
