const router = require("express").Router();
const {addMessage, getAllMessages} = require("../controllers/messagesController");

router.post("/addmsg", addMessage);
router.post("/getallmsgs", getAllMessages);

module.exports = router;
