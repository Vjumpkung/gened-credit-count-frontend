import { components } from "@/schema";
import { apiService } from "@/services/apiservice";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function gened() {
  const router = useRouter();
  const [gened, setGened] = useState<components["schemas"]["GenEdResponseDto"]>(
    {
      Wellness: 0,
      Entrepreneurship: 0,
      Thai_Citizen_and_Global_Citizen: 0,
      Language_and_Communication: 0,
      Aesthetics: 0,
      Others: 0,
    }
  );
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded: JwtPayload & { idcode: string } = jwtDecode(token);

      if (
        (decoded ? (decoded.exp ? decoded.exp * 1000 : 0) : 0) <
        Math.floor(Date.now() / 1000)
      ) {
        localStorage.removeItem("token");
        router.push("/");
        return;
      }
      const stdid = decoded ? decoded.idcode : "";
      apiService.getGenEd(stdid, token).then((res) => {
        setGened(res);
      });
    } else {
      localStorage.removeItem("token");
      router.push("/");
    }
  }, []);

  return (
    <div className="container mx-auto">
      <code>{JSON.stringify(gened)}</code>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => {
          localStorage.removeItem("token");
          router.push("/");
        }}
      >
        Logout
      </button>
    </div>
  );
}
