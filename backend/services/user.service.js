// const edit = async (payload, user) => {
//   try {
//       return await User.findByIdAndUpdate(
//           user._id,
//   {
//       username: payload.username,
//       email: payload.email,
//       phoneNumber: payload.phoneNumber,
//       password:payload.password
//   },
//           {
//               upsert: true,
//               new: true
//           }
//       )
//   } catch (error) {
//       // await ErrorHandler(error)
//   }
// }
const edit = async (payload, id) => {
  try {
    const editedUser = await User.findById(id).select("+password");
    if (editedUser.email !== email) {
      editedUser.email = email;
    }
    if (editedUser.username !== username) {
      editedUser.username = username;
    }
    if (!(await bcrypt.compare(password, editedUser.password))) {
      editedUser.password = password;
    }
    await editedUser.save();
    editedUser.password = undefined;
    return editedUser;
  } catch (err) {
    return next(new AppError(FAILURE, 404));
  }
};
module.exports = { edit };
