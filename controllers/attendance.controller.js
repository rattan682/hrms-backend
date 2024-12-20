const attendenceModel = require("../models/attendence.model");

const getAttendence = async (req, res) => {
  try {
    const { search, status } = req.body;

    const attendence = await attendenceModel.aggregate([
      {
        $lookup: {
          from: "employees",
          localField: "e_id",
          foreignField: "_id",
          as: "employees",
        },
      },
      {
        $unwind: "$employees",
      },
      ...(search
        ? [
            {
              $match: {
                $or: [
                  { "employees.e_name": { $regex: search, $options: "i" } },
                  { "employees.e_dept": { $regex: search, $options: "i" } },
                  { "employees.e_position": { $regex: search, $options: "i" } },
                  { task: { $regex: search, $options: "i" } },
                  { status: { $regex: search, $options: "i" } }, 
                ],
              },
            },
          ]
        : []),
    ]);

    return res.json({
      message: "attendence listed successfully",
      success: true,
      details: attendence,
    });
  } catch (error) {
    console.log(error.message);
    return res.json({
      message: error || "something went wrong",
      success: false,
    });
  }
};

const getAttendee = async (req, res) => {
  try {
    const { id } = req.params;
    const attendee = await attendenceModel.findOne({ _id: id }).populate('e_id');
    return res.json({
      message: "success",
      success: true,
      details: attendee,
    });
  } catch (error) {
    console.log(error.message);
    return res.json({
      message: error || "something went wrong",
      success: false,
    });
  }
};

const updateAttendence = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const updatedAttendence = await attendenceModel.findOneAndUpdate(
      { _id: id },
      data,
      { new: true }
    );
    return res.json({
      message: "updated successfully",
      success: true,
      details: updatedAttendence,
    });
  } catch (error) {
    console.log(error.message);
    return res.json({
      message: error || "something went wrong",
      success: false,
    });
  }
};

const deleteAttendence = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAttendence = await attendenceModel.findOneAndDelete({ _id: id });
    return res.json({
      message: "deleted attendance successfully",
      success: true,
      details: deletedAttendence,
    });
  } catch (error) {
    console.log(error.message);
    return res.json({
      message: error || "something went wrong",
      success: false,
    });
  }
};

const filterAttendence = async (req, res) => {
  try {
    
    const attendence = await attendenceModel.find(query)

    return res.json({
      message: 'attendence fetched successfully',
      success: true,
      details: attendence
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message || 'Something went wrong',
      success: false
    })
  }
}

module.exports = {
  getAttendence,
  getAttendee,
  updateAttendence,
  deleteAttendence,
  searchAttendence,
  filterAttendence
};
