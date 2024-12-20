const bcrypt = require("bcrypt");
const userModel = require("../models/user.model");
const { generateToken } = require("../constant");

const registerUser = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    if (!email || !password || !fullname) {
      return res.json({ message: "All fields are required" });
    } else {
      const haspassword = await bcrypt.hash(password, 10);
      const alreadyUser = await userModel.findOne({ email: email });
      if (alreadyUser) {
        throw "user is already exists";
      }
      await userModel.create({
        email,
        password: haspassword,
        fullname,
      });

      return res.json({
        message: "User created successfully",
        status: 201,
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ message: error || "something went error", success: false });
  }
};

const loginuser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw "all fields are required";
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({
        message: "user not found",
        status: 404,
        success: false,
      });
    }
    const comparePassword = bcrypt.compareSync(password, user?.password);
    if (!comparePassword) {
      throw "invalid password";
    }
    const token = await generateToken({ id: user._id });

    return res
      .cookie("hrtoken", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 60 * 60 * 2 * 1000,
      })
      .json({
        message: "login successfully",
        token,
        status: 200,
        success: true,
      });
  } catch (error) {
    console.log(error);
    res.json({
      message: error || "something went wrong",
      status: 500,
      success: false,
    });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("hrtoken", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    res.json({ message: "logout success", success: true });
  } catch (error) {
    return res.json({ message: "something went wrong", success: false });
  }
};

//  const getuserdata=async(req,res)=>{
//   try {
//     console.log("hello")
//     console.log(req.cookies)
//   } catch (error) {
//     res.json({status:500,success:false})
//   }
// }

module.exports = {
  registerUser,
  loginuser,
  logout,
};
