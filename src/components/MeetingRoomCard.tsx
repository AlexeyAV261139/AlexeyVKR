import React from "react";
import { MeetingRoom } from "../Context/AppContext";

interface Props {
  rooms: MeetingRoom[];
  onSelectRoom: (room: MeetingRoom) => void;
  startTime?: string;
  endTime?: string;
}

export default function MeetingRoomCard({
  rooms,
  onSelectRoom,
  startTime,
  endTime,
}: Props) {
  const filterApplied = !!startTime && !!endTime;

  const isRoomAvailable = (room: MeetingRoom) => {
    if (!filterApplied) return true;
    const start = new Date(startTime!);
    const end = new Date(endTime!);
    return room.bookings.every((booking) => {
      const bookingStart = new Date(booking.startTime);
      const bookingEnd = new Date(booking.endTime);
      return end <= bookingStart || start >= bookingEnd;
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4">
      {rooms.map((room) => {
        const available = isRoomAvailable(room);

        return (
          <div
            key={room.id}
            className={`border rounded-xl p-4 shadow hover:shadow-lg transition cursor-pointer relative ${
              filterApplied
                ? available
                  ? "border-green-500"
                  : "border-red-500"
                : ""
            }`}
            onClick={() => onSelectRoom(room)}
          >
            <img
              src={room.imageUrl || "/placeholder.jpg"}
              alt={room.name}
              className="w-full h-40 object-cover rounded-md mb-2"
            />
            <h2 className="text-lg font-semibold">{room.name}</h2>
            <p className="text-sm text-gray-600">{room.location}</p>
            <p className="text-sm">Вместимость: {room.capacity}</p>

            {/* Маркер только если фильтр применён */}
            {filterApplied && (
              <span
                className={`absolute top-2 right-2 px-2 py-1 text-xs rounded-full font-semibold ${
                  available
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {available ? "Свободна" : "Занята"}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
