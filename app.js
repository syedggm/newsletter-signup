const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const api = "7580cf06e7938b341169edd980df1945-us18"
const listid = "8f6094f9ee";

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

app.get("/", function(req, res){
    res.sendFile(__dirname+"/signup.html");
});

app.post("/", function(req, res){
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;
    var data = {
        members:[{
            email_address:email,
            status:"subscribed",
            merge_fields:{
                FNAME: firstName,
                LNAME:lastName
            }
        }
    ]
    }
    var jsonData = JSON.stringify(data);
    const url = "https://us18.api.mailchimp.com/3.0/lists/8f6094f9ee";
    const options ={
        method: "POST",
        auth: "gogeomart:7580cf06e7938b341169edd980df1945-us18"
    }
const request = https.request(url, options,function(response){
    if (response.statusCode ===200){
        res.sendFile(__dirname+"/success.html")
    }else{
        res.sendFile(__dirname+"/failure.html")
    }
    response.on("data", function(data){
        console.log(JSON.parse(data));
    })

})
request.write(jsonData);
request.end();


})


app.listen(process.env.PORT || 3000, function(){
    console.log("server started at port 3000");
});