const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const {
  getPosts,
  createPost,
  deletePost,
  updatePost,
} = require("../controllers/postController");

router.get("/", auth, getPosts);

router.post("/", auth, createPost);

router.put("/:id", auth, updatePost);

router.delete("/:id", auth, deletePost);

module.exports = router;
