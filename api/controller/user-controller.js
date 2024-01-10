import User from "../models/user-model.js";
import bcryptjs from "bcryptjs";

export const test = (req, res) => {
  res.json({ message: "Hello" });
};

export const updateUser = async (req, res, next) => {

  try {
    
    const _id = req.params.id;
    console.log(_id);
    if (req.body.password) req.body.password = bcryptjs.hashSync(req.body.password, 12)
    const updateUserData = await User.findByIdAndUpdate(
      { _id },
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );
  
    const {password, ...remain} = updateUserData._doc
    console.log(updateUserData);
    res.status(200).json(remain);
  } catch (error) {
    next(error)
  }
};

export const deleteUser = async (req, res, next) => {

  try {
    
    const deleteUserData = await User.findByIdAndDelete(
      { _id: req.params.id }
    );
    
    console.log(deleteUserData);
    res.clearCookie("access_token").status(200).json({message: "User Delete"});
  } catch (error) {
    next(error)
  }
};

export const getUserData = async (req, res, next) => {

  try {
    
    const userData = await User.findById({ _id: req.params.id });

    const {password: pass,  ...remain} = userData._doc

    res.status(200).json(remain);
  } catch (error) {
    next(error)
  }
};
