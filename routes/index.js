const express = require("express");
const router = express.Router();
const dataController = require("../controllers/index");

// const path = require('path');

router.get("/", (req, res) => {
  res.render("index", {
    title: "Home",
    path: "/aboutus",
  });
});

router.get("/contactus", (req, res) => {
  res.render("contactus", {
    title: "Contact us",
    path: "/contactus",
  });
});
router.get("/aboutus", (req, res) => {
  console.log(process.env.TITLE);

  res.render("aboutus", {
    title: "About us",
    path: "/aboutus",
  });
});
router.get("/services", (req, res) => {
  res.render("services", {
    title: "Our services",
    path: "/services",
  });
});

router.post("/payment1", dataController.sendData1);

router.post("/payment2", dataController.sendData2);

router.get("*", (req, res) => {
  res.status(404).render("error404", {
    title: "Error 404",
  });
});

module.exports = router;
