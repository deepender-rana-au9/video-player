const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
app.use(express.json());
app.use(cors());
const URI =
  "mongodb+srv://deepender:deependerrana@cluster0.oap4l.mongodb.net/assignment?retryWrites=true&w=majority";

mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Mongo conected"))
  .catch((err) => console.log(err.message));

const urlSchema = mongoose.Schema({
  url: String,
});

const Url = mongoose.model("url", urlSchema);

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.post("/addurl", async (req, res) => {
  const { url } = req.body;

  if (url.length != 0) {
    const result = await Url.find({ url });
    if (result.length > 0) {
      console.log(result);
      res.status(400).json({ err: "Already exist" });
    } else {
      const newUrl = new Url({
        url,
      });
      const result = await newUrl.save();
      res.json(result);
    }
  }
});

app.get("/playlist/:id", async (req, res) => {
  const id = req.params.id;

  const result = await Url.find({ _id: id });
  console.log(result);
  res.json(result);
});

app.get("/allurls", async (req, res) => {
  const result = await Url.find();
  res.json(result);
});

app.put("/edit", async (req, res) => {
  Url.findByIdAndUpdate(
    req.body.id,
    {
      url: req.body.url,
    },
    {
      new: true,
    }
  )
    .then((res) => console.log(res))
    .catch((err) => console.log(err.message));
});

app.delete("/delete", async (req, res) => {
  Url.findByIdAndDelete(req.body.id, (err, result) => {
    if (err) console.log(err);
    else {
      res.json(result);
      console.log("deleted: " + result);
      // res.redirect("/");
    }
  });
});

app.listen(2000, () => {
  console.log("Listning to 2000");
});
