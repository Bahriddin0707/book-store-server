const { Router } = require("express");

const {
  addBook,
  getBooks,
  getBook,
  updateBook,
  removeBook,
} = require("../controllers/BookControllers");

const router = Router();

router.get("/", getBooks);
router.get("/:id", getBook);
router.post("/add", addBook);
router.put("/:id", updateBook);
router.delete("/:id", removeBook);

module.exports = router;
