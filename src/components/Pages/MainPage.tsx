import React, { useState } from "react";
import MegaMenu from "../MegaMenu";
import { Pages } from "../../types/Pages";
import MeetingRoomsPage from "./MeetingRoomsPage";
import EmployeeListPage from "./EmployeeListPage";
import VacationRequestForm from "../VacationRequestForm";
import VacationRequestManager from "../VacationRequestManager";
import MyVacationRequestsPage from "./MyVacationRequestsPage";
import RoomUsageReport from "../RoomUsageReport";
import ProfilePanel from "./ProfilePanel";
import YouTubePlayer from "../YouTubePlayer";
import StreamCodeSetter from "../StreamCodeSetter";
import CreateMeetingRoomForm from "./CreateMeetingRoomForm";

export default function MainPage() {
  const [activePage, setActivePage] = useState<Pages>(Pages.Rooms);

  return (
    <>
      <MegaMenu activePage={activePage} setActivePage={setActivePage} />
      {activePage === Pages.Rooms && <MeetingRoomsPage />}
      {activePage === Pages.Employee && <EmployeeListPage />}
      {activePage === Pages.VacationRequestForm && <VacationRequestForm />}
      {activePage === Pages.VacationRequestManager && (
        <VacationRequestManager />
      )}
      {activePage === Pages.MyVacationRequestsPage && (
        <MyVacationRequestsPage />
      )}
      {activePage === Pages.RoomStat && <RoomUsageReport />}
      {activePage === Pages.Profile && <ProfilePanel />}
      {activePage === Pages.Translation && (
        <YouTubePlayer
          title="Презентация проекта"
          description="Это видео демонстрирует основные возможности нашей системы бронирования."
        />
      )}
      {activePage === Pages.CreateRoom && <CreateMeetingRoomForm />}
      {activePage === Pages.SetTranslation && <StreamCodeSetter />}
    </>
  );
}
