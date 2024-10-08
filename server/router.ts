const express = require("express");
const {
  getEventsbyPark,
  getEventsbyUser,
  getEvents,
  postEvents,
  deleteEvent,
  editEvent,
} = require("./controllers/eventController");

const { getUsers, signUp, createSession, getSession, destroySession, getUser, deleteUser } = require("./controllers/authController")

const router = express.Router();

router.get("/events/", getEvents);
router.get("/events/park/:place_id", getEventsbyPark);
router.get("/events/user/:user", getEventsbyUser);
router.post("/events", postEvents);
router.delete("/events/:_id", deleteEvent);
router.put("/events/:_id", editEvent);

router.get("/users", getUsers) 
router.get("/users/:token", getUser) 
router.post("/users", signUp)
router.delete("/users/:userId", deleteUser)

router.post("/sessions", createSession); 
router.get("/sessions/:token", getSession); 
router.post("/sessions/:token", destroySession);

export default router;
