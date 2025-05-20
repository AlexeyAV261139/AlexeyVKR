import { Role, useAppContext } from "../Context/AppContext";

export function useIsAdmin(): boolean {
  const { currentUser } = useAppContext();

  if (!currentUser) return false;

  return currentUser.role === Role.Admin  
}
