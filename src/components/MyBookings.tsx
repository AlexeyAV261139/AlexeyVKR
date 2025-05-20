import React from "react";
import { useAppContext } from "../Context/AppContext";

const MyBookings = () => {
  const { currentUser, meetingRooms, setMeetingRooms, bookings, setBookings } =
    useAppContext();

  if (!currentUser) {
    return (
      <p className="text-center text-gray-500">
        Войдите в систему, чтобы просмотреть бронирования.
      </p>
    );
  }

  const now = new Date();

  // Все бронирования пользователя с данными о комнатах
  const userBookings = meetingRooms
    .flatMap((room) =>
      room.bookings.map((booking) => ({
        ...booking,
        roomName: room.name,
        roomLocation: room.location,
        roomId: room.id,
      }))
    )
    .filter(
      (b) =>
        b.employeeId === currentUser.id &&
        new Date(b.endTime).getTime() >= now.getTime() &&
        new Date(b.endTime).getFullYear() >= now.getFullYear() &&
        new Date(b.endTime).getDay() >= now.getDay()
    )
    .sort(
      (a, b) =>
        new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
    );

  const cancelBooking = (bookingId: number, roomId: number) => {
    // Удаляем бронирование из meetingRooms
    setMeetingRooms((prev) =>
      prev.map((room) =>
        room.id === roomId
          ? {
              ...room,
              bookings: room.bookings.filter((b) => b.id !== bookingId),
            }
          : room
      )
    );

    // Удаляем бронирование из общего списка
    setBookings((prev) => prev.filter((b) => b.id !== bookingId));
  };

  if (userBookings.length === 0) {
    return (
      <p className="text-center text-gray-500">У вас пока нет бронирований.</p>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-6 p-4 bg-white shadow-md rounded-xl">
      <h2 className="text-xl font-semibold mb-4">Мои бронирования</h2>
      <ul className="space-y-4">
        {userBookings.map((booking) => (
          <li
            key={booking.id}
            className="border p-4 rounded-lg shadow-sm flex justify-between items-start gap-4"
          >
            <div>
              <div className="font-medium">
                {booking.roomName} ({booking.roomLocation})
              </div>
              <div className="text-sm text-gray-600">
                {new Date(booking.startTime).toLocaleString()} —{" "}
                {new Date(booking.endTime).toLocaleTimeString()}
              </div>
              <div className="mt-1 text-gray-700">Цель: {booking.purpose}</div>
            </div>
            <button
              onClick={() => cancelBooking(booking.id, booking.roomId)}
              className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
            >
              Отменить
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyBookings;
