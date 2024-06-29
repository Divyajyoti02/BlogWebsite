import express from "express";
import bodyParser from "body-parser";
import helpers from "./functions.js";

const app = express();
const port = 3000;

var blog_list = new helpers.classes.BlogList()

blog_list.add(new helpers.classes.Blog(
    "Neque porro quisquam est qui dolorem ipsum quia",
    "Duis molestie eleifend hendrerit. Fusce sollicitudin dui eu dapibus dapibus. Nullam mollis volutpat orci, vel malesuada turpis iaculis sit amet. Proin porta erat a metus feugiat placerat. Etiam sapien sem, fringilla sit amet magna at, fringilla suscipit turpis. Quisque tempus dignissim risus ac bibendum. Praesent quis blandit quam. Donec quis nisi tincidunt, eleifend erat quis, euismod sem.",
    new Date("June 28, 2024 09:40:00 GMT")
));

blog_list.add(new helpers.classes.Blog(
    "Quia dolor sit amet, consectetur, adipisci velit",
    "Suspendisse potenti. Nulla ut turpis eu dui faucibus volutpat. Sed non tristique justo. Duis massa metus, bibendum et varius id, luctus sed nunc. Aliquam felis sapien, tincidunt a scelerisque eget, cursus id risus. Nam accumsan condimentum finibus. Suspendisse eu mauris ullamcorper, suscipit lacus non, posuere elit. Phasellus eget volutpat lorem. Morbi rutrum cursus euismod. Morbi in consequat ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nullam fermentum leo cursus ante commodo, porta cursus ante pellentesque. Morbi rhoncus facilisis odio, sit amet malesuada lorem ultrices quis. Sed varius imperdiet erat at sollicitudin. Sed semper in ex non rhoncus. Fusce auctor augue felis, sit amet semper ligula euismod sed.",
    new Date("June 28, 2024 09:55:00 GMT")
));

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs", {blogs: blog_list.getList(), activeTab: "home", functions: helpers.functions});
});

app.get("/blog", (req, res) => {
    var blog = blog_list.getList()[req.query.idx];
    res.render("blog.ejs", {blog: blog, activeTab: "none"});
});

app.get("/close", (req, res) => {
    blog_list.remove(req.query.idx);
    res.redirect("/");
});

app.get("/create", (req, res) => {
    if (Object.keys(req.query).length === 0) {
        res.render("create.ejs", {activeTab: "create"});
    } else {
        blog_list.add(new helpers.classes.Blog(req.query.title, req.query.desc, new Date()));
        res.redirect("/");
    }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});