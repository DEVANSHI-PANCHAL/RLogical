import LeaveRequest from '../models/leaveRequestModel.js';

const createLeaveRequest = async (req, res) => {
  try {
    const { startDate, endDate, reason } = req.body;

    const newLeaveRequest = new LeaveRequest({
      startDate,
      endDate,
      reason,
      userId: req.user.id,
    });

    await newLeaveRequest.save();

    res.status(201).json({ message: 'Leave request created successfully', leaveRequest: newLeaveRequest });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getAllLeaveRequests = async (req, res) => {
  try {
    const leaveRequests = await LeaveRequest.find({ userId: req.user.id });

    res.status(200).json({ leaveRequests });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getLeaveRequestById = async (req, res) => {
  try {
    const leaveRequestId = req.params.id;

    const leaveRequest = await LeaveRequest.findById(leaveRequestId);

    if (!leaveRequest) {
      return res.status(404).json({ message: 'Leave request not found' });
    }

    res.status(200).json({ leaveRequest });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const updateLeaveRequest = async (req, res) => {
  try {
    const leaveRequestId = req.params.id;
    const { startDate, endDate, reason } = req.body;

    const leaveRequest = await LeaveRequest.findById(leaveRequestId);

    if (!leaveRequest) {
      return res.status(404).json({ message: 'Leave request not found' });
    }

    leaveRequest.startDate = startDate;
    leaveRequest.endDate = endDate;
    leaveRequest.reason = reason;

    await leaveRequest.save();

    res.status(200).json({ message: 'Leave request updated successfully', leaveRequest });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const deleteLeaveRequest = async (req, res) => {
  try {
    const leaveRequestId = req.params.id;

    const leaveRequest = await LeaveRequest.findByIdAndRemove(leaveRequestId);

    if (!leaveRequest) {
      return res.status(404).json({ message: 'Leave request not found' });
    }

    res.status(200).json({ message: 'Leave request deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export {
  createLeaveRequest,
  getAllLeaveRequests,
  getLeaveRequestById,
  updateLeaveRequest,
  deleteLeaveRequest,
};
