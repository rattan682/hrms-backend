const employeeModel = require("../models/employee.model");
const attendeceModel = require("../models/attendence.model");

const createEmployee = async (req, res) => {
  try {
    const data = req.body;

    if (!req.file) {
      return res.status(404).json({ message: "no file found", success: false });
    }

    const newEmployee = new employeeModel({ ...data, pic: req.file.path });
    await newEmployee.save();

    await attendeceModel.create({
      e_id: newEmployee._id,
      task: "",
      status: "Absent",
    });

    return res.json({
      message: "employee registered",
      success: true,
      details: newEmployee,
    });
  } catch (error) {
    console.log(error.message);
    return res.json({
      message: error || "something went wrong",
      success: false,
    });
  }
};
const getEmployees = async (req, res) => {
  try {
    const { search, filter } = req.body;

    let query = {};

    if (filter) {
      query = { ...query, ...filter };
    }

    if (search) {
      query = {
        ...query,
        $or: [
          { e_name: { $regex: search, $options: "i" } },
          { e_email: { $regex: search, $options: "i" } },
          { e_position: { $regex: search, $options: "i" } },
          { e_dept: { $regex: search, $options: "i" } },
        ],
      };
    }

    const employees = await employeeModel.find(query);
    return res.json({
      message: "employees listed successfully",
      success: true,
      details: employees,
    });
  } catch (error) {
    console.log(error.message);
    return res.json({
      message: error || "something went wrong",
      success: false,
    });
  }
};
const getEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await employeeModel.findOne({ _id: id });
    return res.json({
      message: "success",
      success: true,
      details: employee,
    });
  } catch (error) {
    console.log(error.message);
    return res.json({
      message: error || "something went wrong",
      success: false,
    });
  }
};
const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    if (!id) {
      return res.json({ message: "employee not found", success: false });
    }

    const info = req.file ? { ...data, pic: req.file.path } : data;

    const updatedEmployee = await employeeModel.findOneAndUpdate(
      { _id: id },
      info,
      { new: true }
    );
    return res.json({
      message: "updated successfully",
      success: true,
      details: updatedEmployee,
    });
  } catch (error) {
    console.log(error.message);
    return res.json({
      message: error || "something went wrong",
      success: false,
    });
  }
};
const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEmployee = await employeeModel.findOneAndDelete({ _id: id });

    await attendeceModel.findOneAndDelete({ e_id: id });

    return res.json({
      message: "deleted employee successfully",
      success: true,
      details: deletedEmployee,
    });
  } catch (error) {
    console.log(error.message);
    return res.json({
      message: error || "something went wrong",
      success: false,
    });
  }
};

module.exports = {
  createEmployee,
  getEmployees,
  getEmployee,
  updateEmployee,
  deleteEmployee,
};
