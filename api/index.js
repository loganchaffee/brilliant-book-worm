import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import bookRoutes from "./routes/books.js";
import userRoutes from "./routes/users.js";
import readingTestRoutes from "./routes/readingTest.js";
import allUsersRoutes from "./routes/all-users.js";
import postRoutes from "./routes/posts.js";
import notificationRoutes from "./routes/notifications.js";

const __dirname = path.resolve();

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use(express.static(path.resolve(__dirname, "../client/build")));
app.use("/images", express.static(path.resolve(__dirname, "../api/images")));

app.use("/users", userRoutes);
app.use("/books", bookRoutes);
app.use("/reading-test", readingTestRoutes);
app.use("/all-users", allUsersRoutes);
app.use("/posts", postRoutes);
app.use("/notifications", notificationRoutes);

app.get("*", (_, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () =>
      console.log(
        `Server running on ${PORT} and the database connection is good`,
      ),
    ),
  )
  .catch((error) => console.log("Error: ", error.message));
