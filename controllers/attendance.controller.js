const attendenceModel = require("../models/attendence.model");

const getAttendence = async (req, res) => {
  try {
    const { search, filter } = req.body;

    const pipeline = [
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
    ];

    if (search) {
      pipeline.push({
        $match: {
          $or: [
            { "employees.e_name": { $regex: search, $options: "i" } },
            { "employees.e_dept": { $regex: search, $options: "i" } },
            { "employees.e_position": { $regex: search, $options: "i" } },
            { task: { $regex: search, $options: "i" } },
            { status: { $regex: search, $options: "i" } },
          ],
        },
      });
    }

    if (filter && typeof filter === "object") {
      const filterConditions = Object.entries(filter).map(([key, value]) => ({
        [key]: { $regex: value, $options: "i" },
      }));

      if (filterConditions.length > 0) {
        pipeline.push({
          $match: {
            $and: filterConditions,
          },
        });
      }
    }

    const attendence = await attendenceModel.aggregate(pipeline);

    return res.status(200).json({
      message: "Attendance listed successfully",
      success: true,
      details: attendence,
    });
  } catch (error) {
    console.error("Error fetching attendance:", error.message, error.stack);
    return res.status(500).json({
      message: "An error occurred while fetching attendance",
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

module.exports = {
  getAttendence,
  getAttendee,
  updateAttendence,
  deleteAttendence
};
