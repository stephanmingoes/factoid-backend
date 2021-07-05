import {} from "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import PostRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";

const app = express();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/posts", PostRoutes);
app.use("/user", userRoutes);

const username = process.env.USER_NAME;
const password = process.env.PASSWORD;
const CONNECTION_URL = `mongodb+srv://${username}:${password}@factodatabase.gn1zn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const PORT = process.env.PORT || 5000;
const config = {
  autoIndex: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(CONNECTION_URL, config)
  .then(() => app.listen(PORT, () => console.log("Listening on port", PORT)))
  .catch((error) => console.log(error));

mongoose.set("useFindAndModify", false);
