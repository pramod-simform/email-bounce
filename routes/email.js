var express = require("express");
var router = express.Router();

require("dotenv").config();

const UserModel = require("../models/users.model");
const transporter = require("../utils/email");

router.post("/", async function (req, res, next) {

  const email = req.body;

  const response = {
    status: false,
    info: null,
  };

  /**
   * Find the email address in the users collection.
   */
  const userObj = await UserModel.findOne(
    {
      email,
    },
    "emailBounceCounter"
  );

  /**
   * If the email address exits,
   * and email bounce counter is less than 3,
   * then we will send the email to the user.
   */
  if (userObj && userObj.emailBounceCounter < 3) {
    const info = await transporter.sendMail({
      from: process.env.AWS_SES_FROM_ADDRESS, // Sender address
      to: email, // Receivers email address
      subject: "Test Subject", // Subject line
      text: "Hello world?", // Plain text body
      html: "<b>Hello world?</b>", // HTML body
    });

    response.status = true;
    response.info = info;
  }

  res.json(response);
});

module.exports = router;
