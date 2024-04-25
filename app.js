import express from "express";
import { getNotes, getNote, createNote } from "./database.js";
const app = express();

app.use(express.json());

app.get("/notes", async (req, res) => {
  const notes = await getNotes();

  res.send(notes);
});

app.get("/notes/:id", async (req, res, next) => {
  const id = req.params.id;
  const note = await getNote(id);
  res.send(note);
});

app.post("/notes", async (req, res) => {
  const { title, contents } = req.body;
  const note = await createNote(title, contents);
  res.send(note);
});

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
