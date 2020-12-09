const db = require("../models");

//const note = db.notes;
const mCredentials= db.mcredentials;
exports.getUser = (req, res) => {
  const user = req.body.useremail;
    const pass = req.body.password;
    console.log(user, pass)
   // Credential.find({useremail:user,password:pass},{_id:0,username:1,role:1})
   mCredentials.findOne({$and: [{ email :user}, { password:pass }]})
      .then(data => {
        if (!data){
          res.send({ status:false});
        }
        else { req.session.email = req.body.useremail;
          res.send({ status: true});
        }
        })
      .catch(err => { 
        res
        .status(500)
        .send({ status: "Error retrieving user with id=" + user });
       
    });
}

exports.createUser = (req, res) => {
  //var email = req.body.id;
  console.log('get notes');
    const cred = new mCredentials({
      fullname: req.body.data.fullname,
      email: req.body.data.email,
      mobile:req.body.data.mobile,
      city:req.body.data.city,
      password:req.body.data.password
    });
    mCredentials.create(cred)
      .then(data => {
        if (!data){
          res.send({ status:false});
        }
        else {
          res.send({ status: true});
        }
        })
      .catch(err => { console.log(err)
        res
        .status(500)
        .send({ status: "Error creating user"});
       
    });
}



exports.addFile = (req, res, next) => {
  let file = req.file;
    file.path = file.path.replace(/\\/g, "/")
    res.status(200).send(JSON.stringify(file.path));
}

const Moment= db.moments;
exports.addMoment =  (req, res, next) => {
const file=req.body.moment.image;
  const moment = new Moment({
        image: req.body.moment.image.split('\\').pop(),
        description: req.body.moment.description,
        tags:req.body.moment.tags,
        id:req.body.moment.user,
        time: new Date()
      });
  Moment
    .create(moment)
    .then(data => {
      res.send({ status: true });
    })
    .catch(err => {
      res.send({
        status: false,
        message:
          err.message || "Some error occurred while creating the moment."
      });
    });


}

exports.getMoments = (req, res) => {
  Moment.find({deleteflag:false}).sort({date:-1})
    .then(data => { console.log(data)
        res.send( data );
    })
    .catch(err => {
      res
        .status(500)
        .send({ status: "Error retrieving moments" });
    });
}

exports.deleteMoment = (req, res) => {
  const id= req.body.id;
  Moment.updateOne({_id:id}, {$set:{deleteflag:true}})
    .then(data => { //console.log(data)
       res.send({status:true});
      })
    .catch(err => { 
      res
      .status(500)
      .send({ message: "Error while deleting"});
    });
}

exports.editMoment = (req, res) => {
  console.log(req.body)
  const id= req.body.id;
  Moment.updateOne({_id:id}, {$set:{description:req.body.moment.description, tags: req.body.moment.tags, image:req.body.moment.image}})
    .then(data => { //console.log(data)
       res.send({status:true});
      })
    .catch(err => { 
      res
      .status(500)
      .send({ message: "Error while deleting"});
    });
}