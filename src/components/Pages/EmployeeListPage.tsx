import { useState, useMemo } from "react";
import { useAppContext } from "../../Context/AppContext";
import { format } from "date-fns/format";

const EmployeeListPage = () => {
  const { employees } = useAppContext();
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "hireDate">("name");

  const departments = useMemo(
    () => Array.from(new Set(employees.map(e => e.department))),
    [employees]
  );

  const filtered = useMemo(() => {
    return employees
      .filter(e =>
        e.fullName.toLowerCase().includes(search.toLowerCase())
      )
      .filter(e =>
        department ? e.department === department : true
      )
      .sort((a, b) => {
        if (sortBy === "name") {
          return a.fullName.localeCompare(b.fullName);
        } else {
          return new Date(a.hireDate).getTime() - new Date(b.hireDate).getTime();
        }
      });
  }, [employees, search, department, sortBy]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Список сотрудников</h2>

      <div className="flex flex-wrap gap-4 mb-4">
        <input
          className="border p-2 rounded"
          type="text"
          placeholder="Поиск по имени"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <select
          className="border p-2 rounded"
          value={department}
          onChange={e => setDepartment(e.target.value)}
        >
          <option value="">Все отделы</option>
          {departments.map(d => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>

        <select
          className="border p-2 rounded"
          value={sortBy}
          onChange={e => setSortBy(e.target.value as "name" | "hireDate")}
        >
          <option value="name">Сортировка по имени</option>
          <option value="hireDate">Сортировка по дате приёма</option>
        </select>
      </div>

      <ul className="space-y-3">
        {filtered.map(e => (
          <li key={e.id} className="border rounded p-3 shadow-sm">
            <div className="font-semibold">{e.fullName}</div>
            <div>{e.position} — {e.department}</div>
            <div>📧 {e.email} | 📞 {e.phone}</div>
            <div>🗓️ Дата приёма: {e.hireDate ? format(new Date(e.hireDate), "yyyy-MM-dd") : "не указана"}</div>
            <div className={e.isActive ? "text-green-600" : "text-red-600"}>
              {e.isActive ? "Активен" : "Неактивен"}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeListPage;
