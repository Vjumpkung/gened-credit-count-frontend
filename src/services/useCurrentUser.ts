import Cookies from "js-cookie";
import { components } from "@/schema";
import { useEffect, useState } from "react";

export const useCurrentUser = () => {
  const [user, setUser] = useState<
    components["schemas"]["LoginResponseDto"] | null
  >(null);

  useEffect(() => {
    const currentUser = Cookies.get("user");
    if (currentUser) {
      setUser(JSON.parse(currentUser));
    }
  }, []);

  return user;
};
