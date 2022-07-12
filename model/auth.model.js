const mongoose = require("mongoose");
const DataBase =
  "mongodb+srv://galal:galal@cluster0.cscaj.mongodb.net/GAQ?retryWrites=true&w=majority";
const bcrypt = require("bcrypt");
const userSchema = mongoose.Schema({
  username: String,
  password: String,
});
const User = mongoose.model("User", userSchema);

exports.createUser = (username, password, repassword) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DataBase)
      .then(() => {
        return User.findOne({ username: username });
      })
      .then((user) => {
        if (user) {
          mongoose.disconnect();
          reject("user is already exist");
        } else {
          if (password !== repassword) {
            mongoose.disconnect();
            reject("Password not match");
          } else {
            return bcrypt.hash(password, 10);
          }
        }
      })
      .then((passwordHashed) => {
        const newUser = new User({
          username: username,
          password: passwordHashed,
        });
        newUser.save();
        resolve();
      });
  });
};

exports.loginUser = (username, password) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DataBase)
      .then(() => {
        return User.findOne({ username: username });
      })
      .then((user) => {
        if (!user) {
          mongoose.disconnect();
          reject("user is not exist");
        } else {
          bcrypt.compare(password, user.password).then((same) => {
            if (!same) {
              mongoose.disconnect();
              reject("wrong password");
            } else {
              mongoose.disconnect();
              resolve({
                id: user._id,
              });
            }
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
};
