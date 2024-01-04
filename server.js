var express = require("express");
var bodyParser = require("body-parser");

server = express();
var fs = require("fs");

server.use(express.static("one"));//web root
//server.use(express.static("md110"));//web root
server.use(bodyParser.urlencoded());
server.use(bodyParser.json());

var DB = require("nedb-promises");
var ContactDB = DB.create("contact.db");
var PortfolioDB = DB.create("portfolio.db");
//  PortfolioDB.insert([
//     { href: "#portfolioModal1", imgSrc: "my_index_img/1.jpg", title: "000 幽靈豹", title2: "是一隻透明看不到的海豹，出場有幽靈bgm" },
//     { href: "#portfolioModal1", imgSrc: "my_index_img/1.jpg", title: "000", title2: "是一隻透明看海豹，出場有幽靈bgm" }
//  ])
// PortfolioDB.insert([
//     { href: "#portfolioModal1", imgSrc: "one/my_index_img/走路_0001.png", title: "walk", title2: "main character" },
//     { href: "#portfolioModal1", imgSrc: "one/my_index_img/時間軸1_0001.png", title: "highlight", title2: "walkwhighlight" }
// ])
// PortfolioDB.insert([
//     { href: "#portfolioModal1", imgSrc: "my_index_img/a2g.jpg", title: "walk", title2: "main character" },
//     { href: "#portfolioModal1", imgSrc: "my_index_img/a2g.jpg", title: "highlight", title2: "walkwhighlight" }
// ])
// PortfolioDB.insert([

//     { href: "#portfolioModal1", imgSrc: "my_index_img/a2g.jpg", title: "123456", title2: "walkwhighlight" }
// ])
// PortfolioDB.insert ([

//     { href: "#portfolioModal1", imgSrc: "my_index_img/1.jpg", title: "123456", title2: "walkwhighlight" }
// ])

// PortfolioDB.insert ([

//       { href: "#portfolioModal1", imgSrc: "my_index_img/1.jpg", title: "123456", title2: "walkwhighlight" }
//    ])


// PortfolioDB.insert ([
// { href: "#portfolioModal1", imgSrc: "my_index_img/data1.jpg", title: "files", title2: "what's on it" }
//             ])
// PortfolioDB.insert([
//     { href: "#portfolioModal1", imgSrc: "my_index_img/data2.jpg", title: "who", title2: "someone is inside" }
// ])


// PortfolioDB.insert([

//     { href: "#portfolioModal1", imgSrc: "my_index_img/data3.jpg", title: "pen", title2: "Maybe something can be done" }
// ])

//var sharp=
server.set("view engine", "ejs");
server.set("views", __dirname + "/views");


server.get("/contact", function (req, res) {
    //res.send("");
    res.redirect("https:/md.nutc.edu.tw");
});

server.get("/service", function (req, res) {

    Services = [
        { icon: "fa-shopping-cart", title: "E-Commerce", desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur porro laborum fuga repellat necessitatibus corporis nulla, in ex velit recusandae obcaecati maiores, doloremque quisquam similique, tempora aspernatur eligendi delectus! Rem." },
        { icon: "fa-laptop", title: "Responsive Design", desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime qua architecto quo inventore harum ex magni, dicta impedit." },
        { icon: "fa-lock", title: "Web Security", desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit." }
    ]
    res.send(Services);
})

server.get("/portfolio", function (req, res) {

    PortfolioDB.find({}).then(results => {
        if (results != null) {
            res.send(results);
        } else {
            res.send("Error!")
        }
    })

})



server.post("/contact", function (req, res) {
    console.log(req.body);
    ContactDB.insert(req.body);
    res.send();
    //res.redirect("/index.html");
})


server.listen(5500, function () {
    console.log("Server is running at port 8000!")
})