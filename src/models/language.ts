import mongoose = require('mongoose');
import User from './user';
import Schema = mongoose.Schema;

const languageSchema = new mongoose.Schema({
  languagename: String,
  languageid: String,
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Language = mongoose.model('Language', languageSchema);

export default Language;
