import { useState } from "react";
import { useAppContext } from "../Context/AppContext";

export default function VacationRequestForm() {
  const { employees, vacationRequests, setVacationRequests } = useAppContext();

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [comment, setComment] = useState("");
  const { currentUser } = useAppContext();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    

    if (!startDate || !endDate) {
      alert("Заполните все поля.");
      return;
    }

    const newRequest = {
      id: Date.now(),
      employeeId: currentUser!.id,
      startDate,
      endDate,
      status: "Pending" as const,
      comment,
    };

    setVacationRequests([...vacationRequests, newRequest]);
    alert("Заявка на отпуск отправлена!");

    // Очистка формы
    setStartDate("");
    setEndDate("");
    setComment("");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow bg-white">
      <h2 className="text-2xl font-bold mb-4">Заявка на отпуск</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        <div>
          <label className="block font-medium mb-1">Дата начала</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Дата окончания</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Комментарий</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full border rounded px-3 py-2"
            rows={3}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Отправить заявку
        </button>
      </form>
    </div>
  );
}
