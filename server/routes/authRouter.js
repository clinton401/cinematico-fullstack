const {Router} = require("express");
const {register, verifyOtp, forgotPassword,  resetPassword, login, logout, editDetails, generateNewVerificationOtp, getUser, checkAuth, deleteAccount} = require("../controllers/authControllers");
const {requireAuth} = require("../middlewares/authMiddlewares")
const authRouter = Router();



authRouter.post("/register", register);
authRouter.post("/generate-verification-otp/:userId", generateNewVerificationOtp);
authRouter.post("/verify-otp", verifyOtp);
authRouter.post("/forgot-password", forgotPassword);
authRouter.post("/reset-password", resetPassword);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/edit-details",requireAuth,  editDetails);
authRouter.get("/user", requireAuth,  getUser);
authRouter.get("/check-auth", requireAuth,  checkAuth);
authRouter.delete("/delete-account", requireAuth,  deleteAccount);
// authRouter.get("/testing", (req, res) => {
//     res.redirect("/login")
// });









module.exports = authRouter;