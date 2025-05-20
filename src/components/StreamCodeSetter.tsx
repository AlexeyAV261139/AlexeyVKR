import React, { useState } from "react";
import { useAppContext } from "../Context/AppContext";

const StreamCodeSetter: React.FC = () => {
  const { streamCode, setStreamCode } = useAppContext();
  const [inputCode, setInputCode] = useState(streamCode ?? "");

  const handleSave = () => {
    setStreamCode(inputCode.trim());
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-md rounded-xl p-6">
      <h2 className="text-lg font-semibold mb-4">Настройка трансляции</h2>

      <label className="block mb-2 font-medium text-gray-700">
        Введите video ID (например, <code>ywzfbkiTX1k</code>):
      </label>

      <input
        type="text"
        value={inputCode}
        onChange={(e) => setInputCode(e.target.value)}
        placeholder="Код трансляции..."
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-400 mb-4"
      />

      <button
        onClick={handleSave}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        Сохранить
      </button>

      {streamCode && (
        <p className="mt-4 text-sm text-gray-600">
          Текущий код трансляции: <code className="font-semibold">{streamCode}</code>
        </p>
      )}
    </div>
  );
};

export default StreamCodeSetter;
