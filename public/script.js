async function loadRooms() {
    const res = await fetch("/api/rooms");
    const rooms = await res.json();

    const select = document.getElementById("room");

    rooms.forEach(room => {
        const option = document.createElement("option");
        option.value = room.id;
        option.textContent = room.name;
        select.appendChild(option);
    });
}

async function loadBookings() {
    const res = await fetch("/api/bookings");
    const bookings = await res.json();

    const list = document.getElementById("bookingList");
    list.innerHTML = "";

    bookings.forEach(b => {
        const li = document.createElement("li");
        li.textContent = `Rom ${b.room_id} - ${b.date}`;
        list.appendChild(li);
    });
}

async function bookRoom() {

    const room = document.getElementById("room").value;
    const date = document.getElementById("date").value;

    await fetch("/api/bookings", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            room_id: room,
            date: date
        })
    });

    loadBookings();
}

loadRooms();
loadBookings();