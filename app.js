
const express = require("express");
const bodyParse = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParse.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname+"/signup.html");
});


app.post("/", function(req, res){


    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;
    

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields:{
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    
    const jsonData = JSON.stringify(data);
    const url = "https://us10.api.mailchimp.com/3.0/lists/adaa03d0bf";

    const options = {
        method: "POST",
        auth: "sachin1:0953ac5a0795c130765db852a0a11350-us10"
    }


    const request = https.request(url, options, function(response){

        if(response.statusCode===200){
            res.sendFile(__dirname + "/success.html");
        }
        else
        {
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();

});

app.post("/failure", function(req, res){
    res.redirect("/");
});

app.listen(process.env.PORT || 3000, function(){
    console.log("Server is running on port 3000");
});


// My Mailchinp accounts:

// API key
// ef26aaa60a408be0336fc20e5c50e645-us10
// &
// auidence id
//adaa03d0bf