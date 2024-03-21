const express = require("express");
const router = express.Router();

const { createBlog } = require("../Controller/CreateBlogController");

router.post("/", createBlog.Blog);
router.get("/", createBlog.getBlog);

exports.router = router;
