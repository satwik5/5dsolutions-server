const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

var db = mongoose.createConnection("mongodb://localhost:27017/5dsol_db", { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

db.mongoose = mongoose;


const mcredSchema = new mongoose.Schema({
  fullname: { type: String , required:true},
  email: { type: String, required:true}, 
  mobile: { type: String, required:true},
  city: { type: String, required:true},
  password: { type: String, required:true }
})
db.mcredentials = db.model('mcredential', mcredSchema);
const momentSchema = new mongoose.Schema({
  image: { type: String, required:true },
  description: { type: String, required:true },
  tags: { type: Array}, 
  id: { type: String },
  date: { type: Date, required: true, default: Date.now },
  deleteflag:{type:Boolean, default: false}
})
db.moments = db.model('moment', momentSchema);

module.exports = db;