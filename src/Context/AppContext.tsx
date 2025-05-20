import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  use,
} from "react";

// Типы
export interface Employee {
  id: number;
  fullName: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  hireDate: string; // ISO-строка
  isActive: boolean;
  password: string;
  role: Role;
}

export interface MeetingRoom {
  id: number;
  name: string;
  location: string;
  capacity: number;
  hasProjector: boolean;
  imageUrl?: string;
  bookings: Booking[];
}

export interface Booking {
  id: number;
  employeeId: number;
  meetingRoomId: number;
  startTime: string;
  endTime: string;
  purpose: string;
}

export interface VacationRequest {
  id: number;
  employeeId: number;
  startDate: string;
  endDate: string;
  status: "Pending" | "Approved" | "Rejected";
  comment?: string;
}

export interface AuthUser {
  id: number;
  fullName: string;
  role: Role;
}

export enum Role {
  Admin,
  Base,
}

interface AppContextType {
  employees: Employee[];
  meetingRooms: MeetingRoom[];
  bookings: Booking[];
  vacationRequests: VacationRequest[];
  setEmployees: React.Dispatch<React.SetStateAction<Employee[]>>;
  setMeetingRooms: React.Dispatch<React.SetStateAction<MeetingRoom[]>>;
  setBookings: React.Dispatch<React.SetStateAction<Booking[]>>;
  setVacationRequests: React.Dispatch<React.SetStateAction<VacationRequest[]>>;
  currentUser: AuthUser | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  streamCode: string | null;
  setStreamCode: React.Dispatch<React.SetStateAction<string | null>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [streamCode, setStreamCode] = useState<string | null>("jfKfPfyJRdk");

  const login = (email: string, password: string) => {
    const user = employees.find(
      (e) => e.email === email && e.password === password
    );
    if (user) {
      user.isActive = true;
      setCurrentUser(user);
    } else {
      alert("Неверный логин или пароль");
    }
  };

  const logout = () => {
    const user = employees.find((e) => e.id === currentUser?.id);
    user!.isActive = false;
    setCurrentUser(null);
  };

  // 🔸 Мок-данные
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: 1,
      fullName: "Иван Иванов",
      position: "Разработчик",
      department: "ИТ",
      email: "IvanIvanov@mail.ru",
      phone: "+7 922 670-45-10",
      hireDate: "2015-11-21T14:00:00",
      isActive: false,
      role: Role.Base,
      password: "1",
    },
    {
      id: 2,
      fullName: "Анна Смирнова",
      position: "HR",
      department: "Кадры",
      email: "AnnVasilev@mail.ru",
      phone: "+7 922 670-45-11",
      hireDate: "2021-02-24T14:00:00",
      isActive: false,
      role: Role.Base,
      password: "1",
    },
    {
      id: 3,
      fullName: "Админ",
      position: "Администратор",
      department: "",
      email: "1@mail.ru",
      phone: "+7 922 670-45-12",
      hireDate: "",
      isActive: false,
      role: Role.Admin,
      password: "1",
    },
  ]);

  const [meetingRooms, setMeetingRooms] = useState<MeetingRoom[]>([
    {
      id: 1,
      name: "Синий зал",
      capacity: 10,
      location: "Этаж 3",
      imageUrl: "/public/room1.webp",
      hasProjector: false,
      bookings: [
        {
          id: 1,
          employeeId: 1,
          meetingRoomId: 1,
          startTime: "2025-05-20T10:00:00",
          endTime: "2025-05-20T11:00:00",
          purpose: "Совещание по проекту",
        },
        {
          id: 4,
          employeeId: 2,
          meetingRoomId: 1,
          startTime: "2025-05-20T15:00:00",
          endTime: "2025-05-20T16:00:00",
          purpose: "Презентация",
        },
      ],
    },
    {
      id: 2,
      name: "Красная переговорная",
      capacity: 6,
      location: "Этаж 2",
      imageUrl: "/public/room2.webp",
      hasProjector: false,
      bookings: [
        {
          id: 5,
          employeeId: 3,
          meetingRoomId: 2,
          startTime: "2025-05-20T09:00:00",
          endTime: "2025-05-20T10:30:00",
          purpose: "Встреча с клиентом",
        },
        {
          id: 6,
          employeeId: 4,
          meetingRoomId: 2,
          startTime: "2025-05-21T14:00:00",
          endTime: "2025-05-21T15:00:00",
          purpose: "Интервью",
        },
      ],
    },
    {
      id: 6,
      name: "A-101",
      location: "1 этаж",
      capacity: 6,
      imageUrl: "../../public/room3.webp",
      hasProjector: false,
      bookings: [
        {
          id: 2,
          employeeId: 1,
          meetingRoomId: 6,
          startTime: "2025-05-20T12:00:00",
          endTime: "2025-05-20T14:00:00",
          purpose: "Совещание по проекту",
        },
        {
          id: 7,
          employeeId: 5,
          meetingRoomId: 6,
          startTime: "2025-05-22T13:00:00",
          endTime: "2025-05-22T14:00:00",
          purpose: "Рабочая встреча",
        },
      ],
    },
    {
      id: 3,
      name: "B-203",
      location: "2 этаж",
      capacity: 10,
      imageUrl: "../../public/room4.webp",
      hasProjector: false,
      bookings: [
        {
          id: 8,
          employeeId: 6,
          meetingRoomId: 3,
          startTime: "2025-05-23T10:00:00",
          endTime: "2025-05-23T11:30:00",
          purpose: "Обсуждение бюджета",
        },
      ],
    },
    {
      id: 4,
      name: "A-101",
      location: "1 этаж",
      capacity: 6,
      imageUrl: "../../public/room5.webp",
      hasProjector: false,
      bookings: [
        {
          id: 3,
          employeeId: 1,
          meetingRoomId: 4,
          startTime: "2025-05-21T11:00:00",
          endTime: "2025-05-21T12:00:00",
          purpose: "Совещание по проекту",
        },
      ],
    },
    {
      id: 5,
      name: "B-203",
      location: "2 этаж",
      capacity: 10,
      imageUrl: "../../public/room6.webp",
      hasProjector: false,
      bookings: [],
    },
    {
      id: 8,
      name: "A-101",
      location: "1 этаж",
      capacity: 6,
      imageUrl: "../../public/room7.webp",
      hasProjector: false,
      bookings: [],
    },
    {
      id: 7,
      name: "B-203",
      location: "2 этаж",
      capacity: 10,
      imageUrl: "../../public/room8.webp",
      hasProjector: false,
      bookings: [],
    },
  ]);

  const [bookings, setBookings] = useState<Booking[]>([
    // {
    //   id: 1,
    //   employeeId: 1,
    //   meetingRoomId: 1,
    //   startTime: "2025-05-20T10:00:00",
    //   endTime: "2025-05-20T11:00:00",
    //   purpose: "Совещание по проекту",
    // },
  ]);

  const [vacationRequests, setVacationRequests] = useState<VacationRequest[]>([
    {
      id: 1,
      employeeId: 2,
      startDate: "2025-06-01",
      endDate: "2025-06-14",
      status: "Pending",
      comment: "Отпуск по графику",
    },
  ]);

  return (
    <AppContext.Provider
      value={{
        employees,
        meetingRooms,
        bookings,
        vacationRequests,
        setEmployees,
        setMeetingRooms,
        setBookings,
        setVacationRequests,
        currentUser,
        login,
        logout,
        streamCode,
        setStreamCode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context)
    throw new Error("useAppContext must be used within AppProvider");
  return context;
};
