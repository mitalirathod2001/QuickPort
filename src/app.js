var express = require("express");
var app = express();
var path = require("path");
const hbs = require("hbs");
require("./db/conn");

const user_details = require("./models/users");
const user = user_details.User;

const admin_details = require("./models/admin");
const admins = admin_details.Admin;

const message_details = require("./models/messages");
const message = message_details.Message;

const order_details = require("./models/orders");
const order = order_details.Order;

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({extended:false}));

const static_path = path.join(__dirname, "../public");
app.use(express.static(static_path));

const views_path = path.join(__dirname, "../templates/views");
app.set('view engine', 'hbs');
app.set("views", views_path);

const partials_path = path.join(__dirname, "../templates/partials");
hbs.registerPartials(partials_path);

app.get("/", (req, res) => {
    res.render("index")
});

//Register Message
app.post("/", async(req, res) => {
    try {
        const registerMessage = new message({
            name: req.body.inputName,
            email: req.body.inputEmail,
            message: req.body.inputMessage
        })
    
        const registered= await registerMessage.save();

        res.status(201).render("index");
        
    } catch (error) {
        res.status(400).send("error");
    }
 });

app.get("/register", (req, res) => {
    res.render("register")
});

//create new user
app.post("/register", async(req, res) => {
   try {
       const registerUser = new user({
           name: req.body.Name,
           phone: req.body.Phone,
           email: req.body.EMail,
           password: req.body.Password
       })

       const registered= await registerUser.save();
       res.status(201).render("login");
       
   } catch (error) {
       res.status(400).send("email id already taken");
   }
});

app.get("/login", (req, res) => {
    res.render("login")
});

app.post("/login", async(req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const user_instance = await user.findOne({email:email});

        if(user_instance.password === password){
            order.find({requesterEmail:user_instance.email}, function(err, orders){
                res.render("inside", {
                    ordersList: orders
        
                })
            }) 
            //res.status(201).render("inside")
        }else{
            res.send("invalid credentials");
        }

    } catch (error) {
        res.status(400).send("invalid email"); 
    }
});

app.get("/adminlogin", (req, res) => {
    res.render("adminlogin")
});

app.post("/adminlogin", async(req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        

        const admin_instance = await admins.findOne({username:username});

        if(admin_instance.password === password){
            res.status(201).render("admininside")
        }else{
            res.send("invalid credentials");
        }

    } catch (error) {
        res.status(400).send("invalid"); 
    }
});

app.get("/create", (req, res) => {
    res.render("createorder")
})

app.post("/create", async(req, res) => {
    try {
        const registerOrder = new order({
            requesterName: req.body.requesterName,
            requesterEmail: req.body.requesterEmail,
            requesterMob: req.body.requesterMob,

            weight: req.body.weight,
            value: req.body.value,

            pickupName: req.body.pickupName,
            pickupMob: req.body.pickupMob,
            pickupAddress: req.body.pickupAddress,

            deliveryName: req.body.deliveryName,
            deliveryMob: req.body.deliveryMob,
            deliveryAddress: req.body.deliveryAddress,

            status: req.body.status
        })
    
        const registered = await registerOrder.save();

        res.status(201).render("success");
        
    } catch (error) {
        res.status(400).send("error");
    }
 });

 app.get("/admininside", (req, res) => {
    res.render("admininside")
});

app.get("/view", (req, res) => {
    order.find({}, function(err, orders){
        res.render("view", {
            ordersList: orders

        })
    }) 
});

app.post("/search", (req, res) => {
    var fltrname = req.body.fltrname;
    var fltremail = req.body.fltremail;


    
    if(fltrname != '' && fltremail != ''){
        var flterParameter={ 
                $and:[{ requesterName:fltrname},{requesterEmail:fltremail}]
             }
    }else if(fltrname !='' && fltremail ==''){
        var flterParameter={ 
            $and:{requesterName:fltrname}
                 }
    }else if(fltrname =='' && fltremail !=''){
        var flterParameter={ 
            $and:{requesterEmail:fltremail}
                 }
    }else{
        var flterParameter={}
            }
            
        var orderFilter =order.find(flterParameter, function(err, orders){
                if(err) throw err;
                res.render('view', { 
                    ordersList: orders
                });
                  });

    

})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
