const userModel = require("../Models/userModels");
const message = require("../Models/message");
const conversationModel= require("../Models/conversation")
const getUserForSideBar = async (req, res) => {
  try {
    const loggedInUser=req.user._id;
    const conversations = await conversationModel
      .find({ participant: loggedInUser })
      .select("participant");

      // console.log(conversations)

    // Extract the participants from the conversations, excluding the logged-in user
    const conversationUserIds = conversations
      .flatMap((conversation) => conversation.participant)
      .filter((userId) => userId.toString() !== loggedInUser.toString());
 
    // Get the details of those users, excluding their passwords
    const users = await userModel
      .find({ _id: { $in: conversationUserIds } })
      .select("-password");
    // console.log(loggedInUserDetails)
    

    // console.log(users)
    const loggedInUserDetails = await userModel
  .findOne({ _id: loggedInUser })
  .select("-password");

    if (users) {
      return res.status(201).json({
        msg: "success",
        user: users,
        loggedInUserDetails: loggedInUserDetails,
      });
    }
  } catch (error) {
    console.log(`ERROR->SideBarUser: ${error}`);
    return res.status(501).json({ msg: "Internal Server Error" });
  }
};

module.exports = getUserForSideBar;
