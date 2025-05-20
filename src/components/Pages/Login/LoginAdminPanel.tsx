import { useState } from "react";
import { useAppContext } from "../../../Context/AppContext";

export default function LoginPage() {
  const { employees, login } = useAppContext();
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleLogin = () => {
    if (selectedId !== null) login(selectedId);
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-lg shadow">
      <h1 className="text-xl font-bold mb-4">Выберите пользователя</h1>
      <select
        className="w-full border p-2 rounded mb-4"
        onChange={(e) => setSelectedId(Number(e.target.value))}
        defaultValue=""
      >
        <option value="" disabled>Выберите...</option>
        {employees.map((e) => (
          <option key={e.id} value={e.id}>
            {e.fullName} ({e.position})
          </option>
        ))}
      </select>
      <button
        onClick={handleLogin}
        disabled={selectedId === null}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Войти
      </button>
    </div>
  );
}
