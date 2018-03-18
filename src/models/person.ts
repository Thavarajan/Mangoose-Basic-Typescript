import mongoose = require('mongoose');
import User from './user';
import Schema = mongoose.Schema;
import { basePlugin } from "./plugins/baseplugin";
const personSchema = new mongoose.Schema({
  name: String,
  weight: Number,
  age: Number,
  manager: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

personSchema.plugin(basePlugin,{});

const Person = mongoose.model('Person', personSchema);

export default Person;
