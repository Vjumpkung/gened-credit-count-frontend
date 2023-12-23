import GenEdCard from "@/components/GenEdCard";
import { components } from "@/schema";
import { apiService } from "@/services/apiservice";
import { Button } from "@nextui-org/react";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function GenEd() {
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
    <div className="flex min-h-screen flex-col items-center justify-between px-2 py-2">
      <div className="flex flex-col items-center justify-center gap-4 w-full m-auto max-w-screen-md px-2">
        <title>KU GenEd Credit Count - Result Page</title>
        <GenEdCard
          title="กลุ่มสาระอยู่ดีมีสุข"
          credit={gened.Wellness}
          max_credit={6}
        />
        <GenEdCard
          title="กลุ่มสาระศาสตร์แห่งผู้ประกอบการ"
          credit={gened.Entrepreneurship}
          max_credit={3}
        />
        <GenEdCard
          title="กลุ่มสาระพลเมืองไทยและพลเมืองโลก"
          credit={gened.Thai_Citizen_and_Global_Citizen}
          max_credit={5}
        />
        <GenEdCard
          title="กลุ่มสาระภาษากับการสื่อสาร"
          credit={gened.Language_and_Communication}
          max_credit={13}
        />
        <GenEdCard
          title="กลุ่มสาระสุนทรียศาสตร์"
          credit={gened.Aesthetics}
          max_credit={3}
        />
        <GenEdCard title="วิชาเสรี" credit={gened.Others} max_credit={6} />
        <Button
          className="font-bold text-xl"
          size="lg"
          color="primary"
          onClick={() => {
            localStorage.removeItem("token");
            router.push("/");
          }}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}
