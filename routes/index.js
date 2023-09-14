var express = require("express");
var router = express.Router();

const UserModel = require("../models/users.model");

/**
 * Here we will get the AWS SES all notification events payload.
 * You can update the database or track the all notification types.
 */
router.post("/get-info", async function (req, res, next) {
  console.log("Webhook body", req.body);

  const { notificationType, bounce } = req.body;

  /**
   * Check if the notification type is bounce.
   * We will only update the counter if the type is bounce.
   */
  if (notificationType === "Bounce") {
    /**
     * Fetch the email address from the notification payload
     */
    const emailAddress = bounce["bounced Recipients"][0]["emailAddress"];

    /**
     * Find the user in the users collection.
     */
    const userObj = await UserModel.findOne({
      email: emailAddress,
    });

    /**
     * If the user exists in the DB then increase the counter.
     */
    if (userObj) {
      userObj.emailBounceCounter = userObj.emailBounceCounter + 1;
      await userObj.save();
    }
  }

  res.json(req.body);
});

module.exports = router;
