import { apiService } from "./apiservice";

export const useLogin = () => {
  const login = async (username: string, password: string) => {
    const user = await apiService.nontriLogin(username, password);
    if (user) {
      return user;
    } else {
      return false;
    }
  };
  return { login };
};
