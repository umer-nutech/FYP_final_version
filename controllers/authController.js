import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "../helpers/authHelpers.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;
    //validations
    if (!name) {
      return res.send({ message: "Name is required" });
    }
    if (!email) {
      return res.send({ message: "Email is required" });
    }
    if (!password) {
      return res.send({ message: "Password is required" });
    }
    if (!phone) {
      return res.send({ message: "Phone is required" });
    }
    if (!address) {
      return res.send({ message: "Address is required" });
    }
    if (!answer) {
      return res.send({ message: "Answer is required" });
    }
    //Check user
    const existingUser = await userModel.findOne({ email });
    //Check Existing User
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "User already exists, please Login",
      });
    }
    //register user
    const hashedPassword = await hashPassword(password);
    //save
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      answer,
    }).save();
    res.status(201).send({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in registration",
      error,
    });
  }
};

//POST LOGIN

export const LoginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    const token = await JWT.sign(
      {
        _id: user._id,
      },
      process.env.JWT_secret,
      { expiresIn: "7d" }
    );
    res.status(200).send({
      success: true,
      message: "User logged in successfully",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};
//forgotPasswordController
export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      res.status(400).send({ message: "Email is requried" });
    }
    if (!answer) {
      res.status(400).send({ message: "Answer is requried" });
    }
    if (!newPassword) {
      res.status(400).send({ message: "New Password is requried" });
    }

    //check
    const user = await userModel.findOne({ email, answer });
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong Email or Answer",
      });
    }
    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Password Reset successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

//test controller
export const testController = async (req, res) => {
  res.send("protected Route");
};

//update profile
export const updateProfileController = async (req, res) => {
try{
  const {name,email,password,address,phone} =req.body
  const user = await userModel.findById(req.user._id)
  //password
  if(password && password.length < 6)
  {
    return res.json({
      error: 'Password is required and must be atleast 6 characters long',
    })
  }


  const hashedPassword = password ? await hashPassword(password) : undefined
  const updatedUser = await userModel.findByIdAndUpdate(
    req.user._id,{
      name: name || user.name ,
      password: hashedPassword || user.password ,
      phone: phone || user.phone, 
      address: address || user.address,
    },{new:true}
  )

res.status(200).send({
  success: true,
  message: "Profile Updated successfully",
  updatedUser
})
}
catch(error){
res.status(400).send({
  success:false,
  message:"Error while updating profile",
  error
})
}

}
