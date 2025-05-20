import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { format } from "date-fns";
import { Booking, MeetingRoom, useAppContext } from "../Context/AppContext";

interface MeetingRoomModalProps {
  room: MeetingRoom;
  isOpen: boolean;
  onClose: () => void;
}

export default function MeetingRoomModal({
  room: room,
  isOpen,
  onClose,
}: MeetingRoomModalProps) {
  const [selectedStart, setSelectedStart] = useState("");
  const [selectedEnd, setSelectedEnd] = useState("");
  const [purpose, setPurpose] = useState("");
  const { meetingRooms, setMeetingRooms } = useAppContext();
  const { currentUser } = useAppContext();

  const handleBooking = () => {
    if (!selectedStart || !selectedEnd || !purpose) {
      alert("Пожалуйста, заполните все поля");
      return;
    }

    const start = new Date(selectedStart);
    const end = new Date(selectedEnd);

    // Проверка: начало должно быть раньше конца
    if (start >= end) {
      alert("Дата начала должна быть раньше даты окончания");
      return;
    }

    const isSameDay =
      start.getFullYear() === end.getFullYear() &&
      start.getMonth() === end.getMonth() &&
      start.getDate() === end.getDate();

    if (!isSameDay) {
      alert("Дата начала и окончания должны быть в один и тот же день.");
      return;
    }
    
    // Проверка: пересечения с другими бронированиями
    const hasOverlap = room.bookings.some((booking) => {
      const existingStart = new Date(booking.startTime);
      const existingEnd = new Date(booking.endTime);

      return (
        start < existingEnd && end > existingStart // Пересекается по времени
      );
    });

    if (hasOverlap) {
      alert("Выбранный временной интервал пересекается с другим бронированием");
      return;
    }

    const newBooking: Booking = {
      id: Date.now(),
      startTime: selectedStart,
      endTime: selectedEnd,
      purpose,
      employeeId: currentUser!.id,
      meetingRoomId: room.id,
    };

    const updatedRooms = meetingRooms.map((r) =>
      room.id === r.id ? { ...r, bookings: [...r.bookings, newBooking] } : r
    );

    setMeetingRooms(updatedRooms);

    console.log("Бронирование успешно добавлено:", newBooking);
    onClose();
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 max-w-lg w-full p-6 bg-white rounded-xl shadow-xl transform -translate-x-1/2 -translate-y-1/2 space-y-4">
          <Dialog.Title className="text-xl font-semibold">
            {room.name}
          </Dialog.Title>

          {room.imageUrl && (
            <img
              src={room.imageUrl}
              alt={room.name}
              className="w-full h-40 object-cover rounded-lg"
            />
          )}

          <div className="space-y-1 text-sm">
            <p>
              <strong>Местоположение:</strong> {room.location}
            </p>
            <p>
              <strong>Вместимость:</strong> {room.capacity} человек
            </p>
            <p>
              <strong>Проектор:</strong> {room.hasProjector ? "Да" : "Нет"}
            </p>
          </div>

          <div className="border-t pt-3">
            <p className="font-medium">Загруженность:</p>
            <ul className="text-sm max-h-32 overflow-y-auto mt-2">
              {room.bookings.length === 0 ? (
                <li>Нет активных бронирований</li>
              ) : (
                room.bookings
                  .filter((b) => new Date(b.endTime) > new Date())
                  .sort(
                    (a, b) =>
                      new Date(a.startTime).getTime() -
                      new Date(b.startTime).getTime()
                  ) // сортировка по времени начала
                  .map((b) => (
                    <li key={b.id} className="py-1 border-b last:border-b-0">
                      {format(new Date(b.startTime), "MM-dd HH:mm")} –{" "}
                      {format(new Date(b.endTime), "MM-dd HH:mm")} — {b.purpose}
                    </li>
                  ))
              )}
            </ul>
          </div>

          <div className="border-t pt-3">
            <p className="font-medium">Забронировать:</p>
            <div className="flex flex-col space-y-2">
              <input
                type="datetime-local"
                value={selectedStart}
                onChange={(e) => setSelectedStart(e.target.value)}
                className="border p-2 rounded"
              />
              <input
                type="datetime-local"
                value={selectedEnd}
                onChange={(e) => setSelectedEnd(e.target.value)}
                className="border p-2 rounded"
              />
              <input
                type="text"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                placeholder="Цель встречи"
                className="border p-2 rounded"
              />
              <button
                onClick={handleBooking}
                className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
              >
                Забронировать
              </button>
            </div>
          </div>

          <Dialog.Close asChild>
            <button className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl">
              &times;
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
