import { useState } from "react";
import MeetingRoomModal from "../MeetingRoomModal";
import MeetingRoomCard from "../MeetingRoomCard";
import { MeetingRoom, useAppContext } from "../../Context/AppContext";
import MyBookings from "../MyBookings";

export default function MeetingRoomsPage() {
  const { meetingRooms } = useAppContext();
  const [selectedRoom, setSelectedRoom] = useState<MeetingRoom | null>(null);

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const clearFilter = () => {
    setStartTime("");
    setEndTime("");
  };

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <MyBookings/>
      <h1 className="text-3xl font-bold mb-6 px-4">Переговорные комнаты</h1>

      <div className="flex flex-wrap items-center gap-4 px-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Начало</label>
          <input
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="border rounded px-2 py-1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Конец</label>
          <input
            type="datetime-local"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="border rounded px-2 py-1"
          />
        </div>

        <button
          onClick={clearFilter}
          className="mt-5 bg-gray-200 hover:bg-gray-300 text-sm px-3 py-1 rounded"
        >
          Очистить фильтр
        </button>
      </div>

      <MeetingRoomCard
        rooms={meetingRooms}
        onSelectRoom={(room) => setSelectedRoom(room)}
        startTime={startTime}
        endTime={endTime}
      />

      {selectedRoom && (
        <MeetingRoomModal
          room={selectedRoom}
          isOpen={true}
          onClose={() => setSelectedRoom(null)}
        />
      )}
    </div>
  );
}
