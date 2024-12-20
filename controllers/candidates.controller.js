const candidateModel = require("../models/candidate.model");

const createCandidate = async (req, res) => {
  try {
    const data = req.body;
    const newCandidate = new candidateModel(data);
    await newCandidate.save();
    return res.json({
      message: "candidate registered",
      success: true,
      details: newCandidate,
    });
  } catch (error) {
    console.log(error.message);
    return res.json({
      message: error || "something went wrong",
      success: false,
    });
  }
};
const getCandidates = async (req, res) => {
  try {
    const candidates = await candidateModel.find({});
    return res.json({
      message: "candidates listed successfully",
      success: true,
      details: candidates,
    });
  } catch (error) {
    console.log(error.message);
    return res.json({
      message: error || "something went wrong",
      success: false,
    });
  }
};
const getCandidate = async (req, res) => {
  try {
    const { id } = req.params;
    const candidate = await candidateModel.findOne({ _id: id });
    return res.json({
      message: "success",
      success: true,
      details: candidate,
    });
  } catch (error) {
    console.log(error.message);
    return res.json({
      message: error || "something went wrong",
      success: false,
    });
  }
};
const updateCandidate = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const updateCandidate = await candidateModel.findOneAndUpdate(
      { _id: id },
      data,
      { new: true }
    );
    return res.json({
      message: "updated successfully",
      success: true,
      details: updateCandidate,
    });
  } catch (error) {
    console.log(error.message);
    return res.json({
      message: error || "something went wrong",
      success: false,
    });
  }
};
const deleteCandidate = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteCandidate = await candidateModel.findOneAndDelete({ _id: id });
    return res.json({
      message: "deleted candidate  successfully",
      success: true,
      details: deleteCandidate,
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
  createCandidate,
  getCandidates,
  getCandidate,
  updateCandidate,
  deleteCandidate,
};
