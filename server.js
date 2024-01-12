var express = require("express");
var bodyParser = require("body-parser");

server = express();
var fs = require("fs");


// 設置靜態文件夾 "one" 為 Web 根目錄
server.use(express.static("one"));//web root
//server.use(express.static("md110"));//web root

// 使用 body-parser 中間件來解析 HTTP 請求體
server.use(bodyParser.urlencoded());
server.use(bodyParser.json());


// 創建 NeDB 數據庫實例，分別用於存儲聯絡人和作品集的數據
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
// 設置視圖引擎為 EJS
server.set("view engine", "ejs");
server.set("views", __dirname + "/views");

// 處理 "/contact" 路由的 GET 請求，重新導向到 "https:/md.nutc.edu.tw"
server.get("/contact", function (req, res) {
    //res.send("");
    res.redirect("https:/md.nutc.edu.tw");
});




// 處理 "/service" 路由的 GET 請求，返回一些服務信息
server.get("/service", function (req, res) {

    Services = [
        { icon: "fa-shopping-cart", title: "E-Commerce", desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur porro laborum fuga repellat necessitatibus corporis nulla, in ex velit recusandae obcaecati maiores, doloremque quisquam similique, tempora aspernatur eligendi delectus! Rem." },
        { icon: "fa-laptop", title: "Responsive Design", desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime qua architecto quo inventore harum ex magni, dicta impedit." },
        { icon: "fa-lock", title: "Web Security", desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit." }
    ]
    res.send(Services);
})



// 處理 "/portfolio" 路由的 GET 請求，返回作品集數據
server.get("/portfolio", function (req, res) {

    PortfolioDB.find({}).then(results => {
        if (results != null) {
            res.send(results);
        } else {
            res.send("Error!")
        }
    })

})


// 處理 "/contact" 路由的 POST 請求，將聯絡人信息存入數據庫並重定向到根路徑
server.post("/contact", function (req, res) {
    console.log(req.body);
    ContactDB.insert(req.body);
    res.redirect("/");
    res.send();
    
    
})

// 聽取 5500 端口上的請求
server.listen(5500, function () {
    console.log("Server is running at port 8000!")
})