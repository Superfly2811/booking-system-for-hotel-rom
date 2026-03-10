const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());
app.use(express.static("public"));

const DB_FILE = "database.json";

function readDB() {
    return JSON.parse(fs.readFileSync(DB_FILE));
}

function writeDB(data) {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// hent alle rom
app.get("/api/rooms", (req, res) => {
    const db = readDB();
    res.json(db.rooms);
});

// hent bookinger
app.get("/api/bookings", (req, res) => {
    const db = readDB();
    res.json(db.bookings);
});

// lag booking
app.post("/api/bookings", (req, res) => {
    const db = readDB();
    const booking = req.body;

    booking.id = Date.now();

    db.bookings.push(booking);
    writeDB(db);

    res.json({ message: "Booking opprettet!" });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});