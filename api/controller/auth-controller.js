import User from "../models/user-model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const encryptPassword = bcryptjs.hashSync(password, 12);
  const newUser = new User({ username, email, password: encryptPassword });
  await newUser
    .save()
    .then(() => res.json({ statusCode: 200, message: "User Created" }))
    .catch((error) => next(error));
};

export const signin = async (req, res, next) => {
  const {email, password} = req.body;
  const validUser = await User.findOne({email})
  if (!validUser) return next(errorHandler(404, "User Not Found"))
  const validPassword = bcryptjs.compareSync(password, validUser.password)
  if (!validPassword) return next(errorHandler(404, "Wrong Creditional"))
  const token = jwt.sign({id: validUser._id}, process.env.JWT_TOKEN)

  const {password: pass, ...remain} = validUser._doc;

  return res.cookie('access_token', token, {httpOnly: true}).status(200).json(remain)
}
