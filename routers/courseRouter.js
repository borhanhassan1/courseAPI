const express = require("express");
const courseController = require("../Controllers/courseController");
const { body } = require("express-validator");
const verifyToken = require("../middleware.js/verifyToken");
const allowedTo = require("../middleware.js/allowedTo");
const router = express.Router();
const courseValidator = () => {
  return [
    body("title")
      .notEmpty()
      .withMessage("title should not be empty!")
      .isLength({ min: 3, max: 10 })
      .withMessage("min length 3 and max 10"),
    body("price")
      .notEmpty()
      .withMessage("price should take value")
      .isInt({ min: 1 })
      .withMessage("price should be positive"),
  ];
};

//router.get("/api/courses", courseController.getCourses);
router.post("/api/courses", courseValidator(), courseController.addCourse);
router.get("/api/courses/:title", courseController.getCourse);
router.delete("/api/courses/:title", courseController.delCourse);
router.patch("/api/courses/:title", courseController.updateCourse);
router.get(
  "/api/courses",
  verifyToken,
  allowedTo("ADMIN"),
  courseController.pagination
);
module.exports = router;
