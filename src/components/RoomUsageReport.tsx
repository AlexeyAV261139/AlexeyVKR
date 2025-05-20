import React, { useState, useMemo } from "react";
import { useAppContext } from "../Context/AppContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function getDayOfWeek(dateStr: string): string {
  const days = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
  const date = new Date(dateStr);
  return days[date.getDay()];
}

export default function RoomUsageReport() {
  const { meetingRooms } = useAppContext();
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const filteredBookings = useMemo(() => {
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    return meetingRooms.flatMap((room) =>
      room.bookings.filter((b) => {
        const startTime = new Date(b.startTime);
        return (!start || startTime >= start) && (!end || startTime <= end);
      })
    );
  }, [meetingRooms, startDate, endDate]);

  const roomLoadStats = useMemo(() => {
    const stats: Record<string, number> = {};
    meetingRooms.forEach((room) => {
      const count = room.bookings.filter((b) => {
        const date = new Date(b.startTime);
        return (!startDate || date >= new Date(startDate)) &&
               (!endDate || date <= new Date(endDate));
      }).length;
      stats[room.name] = count;
    });
    return stats;
  }, [meetingRooms, startDate, endDate]);

  const hourlyUsageStats = useMemo(() => {
  const hourlyCounts = new Array(24).fill(0);

  filteredBookings.forEach((booking) => {
    const start = new Date(booking.startTime);
    const end = new Date(booking.endTime);

    // Пройдёмся по каждому часу между start и end
    let current = new Date(start);
    while (current <= end) {
      const hour = current.getHours();
      hourlyCounts[hour]++;
      current.setHours(current.getHours() + 1);
    }
  });

  return hourlyCounts.map((count, hour) => ({
    hour: `${hour}:00`,
    count,
  }));
}, [filteredBookings]);

  const dayOfWeekStats = useMemo(() => {
    const stats: Record<string, number> = {
      Понедельник: 0,
      Вторник: 0,
      Среда: 0,
      Четверг: 0,
      Пятница: 0,
      Суббота: 0,
      Воскресенье: 0,
    };

    filteredBookings.forEach((b) => {
      const day = getDayOfWeek(b.startTime);
      stats[day]++;
    });

    return Object.entries(stats).map(([day, count]) => ({ day, count }));
  }, [filteredBookings]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Отчёт о загруженности переговорных</h2>

      <div className="flex gap-4 mb-6">
        <div>
          <label className="block text-sm mb-1">Начало периода</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border rounded px-2 py-1"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Конец периода</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border rounded px-2 py-1"
          />
        </div>
      </div>

      <h3 className="text-lg font-semibold mb-2">Загруженность по комнатам</h3>
      <ul className="list-disc list-inside mb-6">
        {Object.entries(roomLoadStats).map(([name, count]) => (
          <li key={name}>
            {name}: {count} бронирований
          </li>
        ))}
      </ul>

      <h3 className="text-lg font-semibold mb-2">Активность по часам</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={hourlyUsageStats}>
          <XAxis dataKey="hour" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#6366f1" />
        </BarChart>
      </ResponsiveContainer>

      <h3 className="text-lg font-semibold mt-8 mb-2">Активность по дням недели</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={dayOfWeekStats}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#10b981" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
