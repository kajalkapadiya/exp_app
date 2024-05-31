const express = require("express");
const bodyParser = require("body-parser");
require("./models/index");
const app = express();
const sequelize = require("./models/index");
const userRoutes = require("./routes/userRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const purchaseRoutes = require("./routes/purchase");
const premiumFeatureRoutes = require("./routes/premiumFeature");
const forgotPassRoutes = require("./routes/forgotPassRoutes");
const path = require("path");
require("dotenv").config();
const User = require("./models/user");
const Expense = require("./models/expense");
const Order = require("./models/orders");
const Forgotpassword = require("./models/ForgotPasswordRequests");
// const helmet = require("helmet");
const fs = require("fs");
const morgan = require("morgan");

require("dotenv").config();
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "views")));
// app.use(helmet());
app.use(morgan("combined", { stream: accessLogStream }));

User.hasMany(Expense); // user has many expenses
Expense.belongsTo(User); // but expense belong to only one user

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(Forgotpassword);
Forgotpassword.belongsTo(User);

// Sync Sequelize models with the database
sequelize
  .sync()
  .then(() => {
    console.log("Sequelize models synchronized with the database");
  })
  .catch((error) => {
    console.error("Error synchronizing Sequelize models:", error);
  });

//routes
app.use("/", userRoutes);
app.use("/expenses", expenseRoutes);
app.use("/purchase", purchaseRoutes);
app.use("/premium", premiumFeatureRoutes);
app.use("/password", forgotPassRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
