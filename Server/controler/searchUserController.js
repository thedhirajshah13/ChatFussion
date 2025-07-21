const userModel = require("../Models/userModels");

const searchUserController = async (req, res) => {
  const { username } = req.query;
  console.log(username);
  try {
    if (!username) {
      return res.status(400).json({ message: "Username is required" });
    }

    // Search for users with a matching username (case-insensitive)
    const users = await userModel
      .find({
        username: { $regex: username, $options: "i" }, // Case-insensitive regex
      })
      .select("-password -confirmPassword"); // Exclude sensitive fields

    // Return results or no match message
    if (users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json(users);
  } catch (error) {
    console.error("Error during user search:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = searchUserController;
