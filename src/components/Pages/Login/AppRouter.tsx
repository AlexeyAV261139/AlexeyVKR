import { useAppContext } from "../../../Context/AppContext";
import MainPage from "../MainPage";
import LoginAdminPanel from "./LoginAdminPanel";
import LoginForm from "./LoginForm";


export default function AppRouter() {
  const { currentUser } = useAppContext();

  // return currentUser ? <MainPage /> : <LoginAdminPanel />;
  return currentUser ? <MainPage /> : <LoginForm />;
}
