import React, { useState } from "react";
import { MeetingRoom, useAppContext } from "../../Context/AppContext";

const CreateMeetingRoomForm: React.FC = () => {
  const { meetingRooms, setMeetingRooms } = useAppContext();

  const [form, setForm] = useState<Omit<MeetingRoom, "id" | "bookings">>({
    name: "",
    location: "",
    capacity: 1,
    hasProjector: false,
    imageUrl: "",
  });

  const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
) => {
  const target = e.target;
  const name = target.name;
  const value =
    target instanceof HTMLInputElement && target.type === "checkbox"
      ? target.checked
      : target.value;

  setForm((prev) => ({
    ...prev,
    [name]: value,
  }));
};

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newRoom: MeetingRoom = {
      ...form,
      id: Math.max(0, ...meetingRooms.map((r) => r.id)) + 1,
      bookings: [],
    };

    setMeetingRooms([...meetingRooms, newRoom]);
    setForm({
      name: "",
      location: "",
      capacity: 1,
      hasProjector: false,
      imageUrl: "",
    });
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow-md rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-4">Добавить новую переговорную</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block font-medium">Название:</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Расположение:</label>
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Вместимость:</label>
          <input
            type="number"
            name="capacity"
            value={form.capacity}
            onChange={handleChange}
            min={1}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="hasProjector"
            checked={form.hasProjector}
            onChange={handleChange}
          />
          <label>Есть проектор</label>
        </div>

        <div>
          <label className="block font-medium">Ссылка на изображение:</label>
          <input
            type="text"
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
            placeholder="/public/roomX.webp"
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Сохранить
        </button>
      </form>
    </div>
  );
};

export default CreateMeetingRoomForm;
