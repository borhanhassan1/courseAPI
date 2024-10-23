const courses = require("../models/Courses");
const { validationResult } = require("express-validator");
const status = require("../utils/statusMessage");

const getCourses = async (req, res) => {
  let Courses = await courses.find();
  res.json({ status: status.SUCCESS, data: { Courses } });
};

const addCourse = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: status.FAIL, data: errors });
  }
  const course = {
    title: req.body.title,
    price: req.body.price,
  };
  await courses.create(course);
  res.send("ok");
};

const getCourse = async (req, res) => {
  let course = await courses.findOne({ title: req.params.title });
  res.json(course);
};

const delCourse = async (req, res) => {
  await courses.deleteOne({ title: req.params.title });
  res.json("deleted");
};

const updateCourse = async (req, res) => {
  let course = await courses.findOne({ title: req.params.title });
  course = { course, ...req.body };
  await courses.updateOne(
    { title: req.params.title },
    {
      title: course.title,
      price: course.price,
    }
  );
  res.send("updated");
};

const pagination = async (req, res) => {
  let page = req.query.page || 2;
  let limit = req.query.limit || 3;

  let skip = (page - 1) * limit;
  const Courses = await courses.find({}, { __v: 0 }).skip(skip).limit(limit);
  res.json({ status: status.SUCCESS, data: { Courses } });
};

module.exports = {
  getCourses,
  addCourse,
  getCourse,
  delCourse,
  updateCourse,
  pagination,
};
