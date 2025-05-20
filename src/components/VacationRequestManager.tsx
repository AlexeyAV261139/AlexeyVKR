import { useAppContext } from "../Context/AppContext";

export default function VacationRequestManager() {
  const { vacationRequests, setVacationRequests, employees } = useAppContext();

  const handleDecision = (id: number, decision: "Approved" | "Rejected") => {
    const updatedRequests = vacationRequests.map((req) =>
      req.id === id ? { ...req, status: decision } : req
    );
    setVacationRequests(updatedRequests);
  };

  const getEmployeeName = (id: number) => {
    const emp = employees.find((e) => e.id === id);
    return emp ? emp.fullName : "Неизвестный сотрудник";
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white border rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Управление заявками на отпуск</h2>

      {vacationRequests.length === 0 ? (
        <p>Заявок пока нет.</p>
      ) : (
        <ul className="space-y-4">
          {vacationRequests.map((req) => (
            <li
              key={req.id}
              className="border p-4 rounded-lg flex justify-between items-start"
            >
              <div>
                <p className="font-semibold">
                  {getEmployeeName(req.employeeId)}
                </p>
                <p>
                  📅 {req.startDate} — {req.endDate}
                </p>
                {req.comment && <p className="text-gray-600">💬 {req.comment}</p>}
                <p className="mt-1">
                  Статус:{" "}
                  <span
                    className={
                      req.status === "Pending"
                        ? "text-yellow-600"
                        : req.status === "Approved"
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {req.status === "Pending"
                      ? "Ожидает"
                      : req.status === "Approved"
                      ? "Одобрено"
                      : "Отклонено"}
                  </span>
                </p>
              </div>

              {req.status === "Pending" && (
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => handleDecision(req.id, "Approved")}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
                  >
                    Одобрить
                  </button>
                  <button
                    onClick={() => handleDecision(req.id, "Rejected")}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                  >
                    Отклонить
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
