import React, { useState } from "react";
import { useAppContext } from "../../Context/AppContext";

const ProfilePanel = () => {
  const { currentUser, employees, setEmployees, logout } = useAppContext();

  if (!currentUser)
    return <p className="text-center mt-6">Вы не авторизованы</p>;

  const employee = employees.find((e) => e.id === currentUser.id);
  if (!employee) return <p>Пользователь не найден</p>;

  // Предполагаем, что поле "confirmed" - булево значение, есть ли подтверждение участия
  const [confirmed, setConfirmed] = useState(employee.confirmed || false);

  const [formData, setFormData] = useState({
    fullName: employee.fullName,
    phone: employee.phone,
    department: employee.department,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setEmployees((prev) =>
      prev.map((e) =>
        e.id === employee.id ? { ...e, ...formData, confirmed } : e
      )
    );
    alert("Профиль обновлён");
  };

  const handleConfirm = () => {
    setConfirmed(true);
    // Обновим сразу и в глобальном состоянии
    setEmployees((prev) =>
      prev.map((e) => (e.id === employee.id ? { ...e, confirmed: true } : e))
    );
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4 text-center">Профиль</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">ФИО</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Телефон</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">Отдел</label>
        <input
          type="text"
          name="department"
          value={formData.department}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      {/* Новая секция для подтверждения участия */}
      <div className="mb-6">
        <p className="mb-2 font-medium">Подтвердить участие в конференции:</p>
        {confirmed ? (
          <p className="text-green-600 font-semibold">Вы подтвердили участие ✔️</p>
        ) : (
          <button
            onClick={handleConfirm}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Подтвердить участие
          </button>
        )}
      </div>

      <div className="mb-6 flex gap-4">
        <button
          onClick={handleSave}
          className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Сохранить изменения
        </button>
      </div>
      <div className="flex gap-4">
        <button
          onClick={logout}
          className="flex-1 bg-gray-400 text-white py-2 rounded hover:bg-gray-500"
        >
          Выйти из аккаунта
        </button>
      </div>
    </div>
  );
};

export default ProfilePanel;
