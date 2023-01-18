const { register, login, setAvatar, getAllUsers, logOut, firebaseLogin } = require("../controllers/userController");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.post("/setAvatar/:id", setAvatar);
router.get("/allUsers/:id", getAllUsers);
router.post("/logout/:id", logOut)
router.post("/firebaseLogin", firebaseLogin)

module.exports = router;
