
const express = require('express');
// import mongoose
const mongoose = require('mongoose');
// import model User
const User = require('./models/user');

// 
const Plat = require('./models/plat')
// import body parser
const bodyParser = require('body-parser');

const bcrypt = require('bcrypt');

//import user
const user = require('./models/user');

// import multer

const multer = require('multer');
// import path
const path = require('path');

//Import PDF_KIT

const fs=require('fs');
const PDFDocument = require('./pdfkit');

// instance express in app
const app = express();

// Connect to Data Base
mongoose.connect('mongodb://localhost:27017/MedDB', {
    useNewUrlParser:
        true, useUnifiedTopology: true
})

// Security configuration
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, Accept, Content-Type, X-Requested-with, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, DELETE, OPTIONS, PATCH, PUT"
    );
    next();
});

//body parser configuration 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// multer****************************************************************************************************
//acces au fichiers

app.use('/images', express.static(path.join('backend/images')))

//config multer 
//etape 1 :definition des extensions

const MIME_TYPE = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpeg': 'jpg', 
    'application/pdf' : 'pdf'
    }

//etape 2 : definition des destinatons et les noms des fichiers
const storage = multer.diskStorage({
    // destination
    destination: (req, file, cb) => {
    const isValid = MIME_TYPE[file.mimetype];
    let error = new Error("Mime type is invalid");
    if (isValid) {
    error = null;
    }
    //Affecter la destination
    cb(null, 'backend/images')
    },
    //file name
    filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const extension = MIME_TYPE[file.mimetype];
    const imgName = name + '-' + Date.now() + '-crococoder-' +
    '.' + extension;
    //Affecter file name
    cb(null, imgName);
    }
    });




// **********************************************************************************************************
// traitement create user
app.post('/api/createUser', (req, res) => {

console.log(req.body);
User.findOne({email : req.body.email}).then(
(doc) =>{
    if (doc) {
        res.status(200).json({message : "user exist"});
    }else{
        bcrypt.hash(req.body.password, 10).then(cryptedPassword => {

            let user = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: cryptedPassword,
                phone: req.body.phone,
                dateOfBirth: req.body.dateOfBirth,
                experience: req.body.experience,
                speciality: req.body.speciality,
                role: req.body.role
        
            });
        
            // etape 2 
            user.save();
        
            // etape 3
        
            res.status(200).json({
                message: 'User added with sucess'
            })
            })
    }
}



)


    

});

// Traitement de get All Users

app.get('/api/allUsers', (req, res) => {
    console.log('hello in be to get all Users');

    // Etape 1
    User.find((err, docs) => {
        if (err) {
            console.log('error in DB');
        }
        else {
            // succes
            res.status(200).json({
                users: docs
            });
        }

    });
});

// Traitement  de get chef by id
app.get('/api/allUsers/:id', (req, res) => {
    console.log("here in function get user by id");

    // etape 1
    let id = req.params.id;
    console.log("id user to search", id);


    // etape 2
    User.findOne({ _id: id }).then(
        (doc) => {
            console.log("finded User", doc);
            res.status(200).json({
                user: doc
            })
        }
    )
})


// traitement de delete User
app.delete('/api/allUsers/:id', (req, res) => {

    console.log("here in fucntion delete user");

    // etape 1
    let id = req.params.id;
    // RECHERCHE SI ROLE CHEF POUR EFFACER TOUS SES PLATS
    // recherche user + TEST ROLE
   User.findOne({_id:id}).then(
       (result)=>{
           console.log("user", result);
           if (result.role == 'chef') {

            //   suppression des plats
            Plat.deleteMany({idChef:id}) .then(
            ()=>{ console.log("deleted plats");
             
        })

           } 
       })
       
    console.log("user id to delete", id);

    // etape 2
    User.deleteOne({ _id: id }).then(
        (result) => {
            console.log("delete result", result);

            if (result) {
                // success
                res.status(200).json({
                    message: "User deleted with success"
                })
            }

        })
})

//traitement de login
app.post("/api/login", (req, res) => {
    console.log("Here in login", req.body);
    User.findOne({ email: req.body.email }).then(
        (resultEmail) => {
            console.log("resultEmail", resultEmail);
            if (!resultEmail) {
                res.status(200).json({
                    findedUser: "Wrong Email"
                });
            }
            return bcrypt.compare(req.body.password, resultEmail.password);
        })
        .then(
            (resultPwd) => {
                console.log("resultPwd", resultPwd);
                if (!resultPwd) {
                    res.status(200).json({
                        findedUser: "Wrong password"
                    });
                }
                else {
                    User.findOne({ email: req.body.email }).then(
                        (result) => {
                            console.log("result", result);
                            res.status(200).json({
                                findedUser: result
                            })
                        }
                    )
                }
            })
});

// add plat

app.post('/api/addPlat', multer({ storage: storage
}).single('img'), (req, res) => {
console.log("here in add Plat");

let url = req.protocol + '://' + req.get('host');

Plat.findOne({platName: req.body.platName,idChef: req.body.idChef}).then(

(doc) =>{

if (doc) {
    res.status(200).json({message : "plat exist"});
} else {
    let plat = new Plat({
        platName: req.body.platName,
        price: req.body.price,
        description: req.body.description,
        idChef :  req.body.idChef,
        img : url+ '/images/' + req.file.filename
        

    });

    // etape 2 
    plat.save();

    // etape 3

    res.status(200).json({
        message: 'Plat added with sucess'
    });

}

}

)

   
    

});

// get all plat

app.get('/api/allPlats', (req, res) => {
    console.log('hello in get all Plats');

    // Etape 1
    Plat.find((err, docs) => {
        if (err) {
            console.log('error in DB');
        }
        else {
            // succes
            res.status(200).json({
                plats: docs
            });
        }

    });
});

// delete plat 
app.delete('/api/allPlats/:id', (req, res) => {

    console.log("here in fucntion delete user");

    // etape 1
    let id = req.params.id;
    console.log("plat id to delete", id);

    // etape 2
    Plat.deleteOne({ _id: id }).then(
        (result) => {
            console.log("delete result", result);

            if (result) {
                // success
                res.status(200).json({
                    message: "Plat deleted with success"
                })
            }

        })
})

// Traitement  de get plat by id (display plate by id)

app.get('/api/allPlats/:id', (req, res) => {
    console.log("here in function get plat by id");

    // etape 1
    let id = req.params.id;
    console.log("id plat to search", id);

    // etape 2
    Plat.findOne({ _id: id }).then(
        (doc) => {
            console.log("finded Plat", doc);
            res.status(200).json({
                plat: doc
            })
        }
    )
});

// traitement de get my plats
app.get('/api/myPlats/:id', (req, res) => {
    console.log("here in function get my plats");

    let id = req.params.id;

    Plat.find({ idChef: id }, (err, doc) => {

        if (err) {
            console.log("err in DB");
        } else {
            res.status(200).json({
                myPlats: doc
            })
        }
    })
});

// traitement edit user

app.put('/api/allUsers/:id', (req,res) =>{
console.log("here in function edit user");

let user = {
_id :req.body._id,
firstName : req.body.firstName,
lastName : req.body.lastName,
email : req.body.email,
password : req.body.password,
speciality : req.body.speciality,
phone : req.body.phone,
experience : req.body.experience,
dateOfBirth : req.body.dateOfBirth,
role : req.body.role

};
User.updateOne({_id : req.body._id},user).then(
(result)=>{

    console.log("result update", result);
    res.status(200).json({
        message : "edited with success"
    });
}


)
} )

// traitement edit plat

app.put('/api/allPlats/:id', (req,res)=>{
    console.log("here in edit plat");
    let plat={
        _id:req.body._id,
        platName: req.body.platName,
        price: req.body.price,
        description: req.body.description,
        idChef :  req.body.idChef
    };
Plat.updateOne({_id: req.body._id}, plat).then(
(result)=>{
    console.log("result update", result);
    res.status(200).json({
        message :"edited with success"
    })
}


)

})

//PDF generate 
app.get('/api/allUsers/generateFile/pdf', (req, res) => {
    User.find((err, docs) => {
        if (err) {
            console.log("ERROR");
        } else {
            // Create The PDF document
            const doc = new PDFDocument();
            // Pipe the PDF into a user's file
            doc.pipe(fs.createWriteStream(`backend/pdfs/test.pdf`));
            // Add the header -https://pspdfkit.com/blog/2019/generate-invoices pdfkit-node/
            doc
                .image("backend/images/logo.jpg", 50, 45, { width: 50 })
                .fillColor("#444444")
                .fontSize(20)
                .text("Here All Users", 110, 57)
                .fontSize(10)
                .text("Imm Yasmine Tower", 200, 65, { align: "right" })
                .text("Centre Urbain Nord", 200, 80, { align: "right" }).moveDown();
            // Create the table -https://www.andronio.me/2017/09/02/pdfkit-tables/
            const table = {
                headers: [
                    "FirstName",
                    "LastName",
                    "Email Address",
                    "Phone",
                    "role",
                ],
                rows: [],
            };
            // Add the users to the table
            for (const user of docs) {
                table.rows.push([
                    user.firstName,
                    user.lastName,
                    user.email,
                    user.phone,
                    user.role,
                ]);
            }
            // Draw the table
            doc.moveDown().table(table, 10, 125, { width: 590 }); 
            // Finalize the PDF and end the stream
            doc.end();
            res.status(200).json({
                message: "HERE PDF (success)",
            });
        }
    });
});

//traitement search 


app.post('/api/searchChef', (req, res) => {
    console.log('here in search value',);

    //etape 1 : recuperation de la valeur 
    let searchValue = req.body.searchValue;

    console.log("searchValue", searchValue);

    //etape 2 : la recherche

    User.find({
        $or: [
            { speciality: {$regex: `.*${searchValue}` }},
            { firstName: {$regex: `.*${searchValue}` }},
        ]
    }).then(
        (docs) => {
            if (docs) {
                console.log("result", docs);
                res.status(200).json({
                    chefs: docs
                })

            }
        }

    )


})

// export app
module.exports = app;
