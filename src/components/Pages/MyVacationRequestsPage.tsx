import { useAppContext } from "../../Context/AppContext";

export default function MyVacationRequestsPage() {
  const { vacationRequests, employees } = useAppContext();

  // Замените на реального сотрудника, когда будет реализована авторизация
  const currentEmployeeId = 1;

  const myRequests = vacationRequests.filter(
    (req) => req.employeeId === currentEmployeeId
  );

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white border rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Мои заявки на отпуск</h2>

      {myRequests.length === 0 ? (
        <p>Вы ещё не подавали заявки на отпуск.</p>
      ) : (
        <ul className="space-y-4">
          {myRequests.map((req) => (
            <li
              key={req.id}
              className="border p-4 rounded-lg bg-gray-50 flex justify-between items-start"
            >
              <div>
                <p>
                  📅 <b>{req.startDate}</b> — <b>{req.endDate}</b>
                </p>
                {req.comment && (
                  <p className="text-gray-600 mt-1">💬 {req.comment}</p>
                )}
              </div>
              <div>
                <span
                  className={`font-semibold ${
                    req.status === "Pending"
                      ? "text-yellow-600"
                      : req.status === "Approved"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {req.status === "Pending"
                    ? "Ожидает"
                    : req.status === "Approved"
                    ? "Одобрено"
                    : "Отклонено"}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
