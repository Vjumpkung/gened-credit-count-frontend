import GenEdCard from "@/components/GenEdCard";
import { components } from "@/schema";
import { apiService } from "@/services/apiservice";
import { Button, Switch } from "@nextui-org/react";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function GenEd() {
  const router = useRouter();
  const [language, setLanguage] = useState<"th" | "en">("th");
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
  const [subjectlist, setSubjectlist] = useState<
    components["schemas"]["SubjectListResponseDto"]
  >({
    Wellness: [],
    Entrepreneurship: [],
    Thai_Citizen_and_Global_Citizen: [],
    Language_and_Communication: [],
    Aesthetics: [],
    Others: [],
  });
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded: JwtPayload & { idcode: string } = jwtDecode(token);

      if (
        (decoded ? (decoded.exp ? decoded.exp : 0) : 0) <
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
      apiService.listSubject(stdid, token).then((res) => {
        setSubjectlist(res);
      });
    } else {
      localStorage.removeItem("token");
      router.push("/");
    }
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-between px-2 py-2">
      <div className="flex flex-col items-center justify-center gap-4 w-full m-auto max-w-screen-md px-2">
        <div className="relative">
          <Switch
            defaultSelected
            onChange={(e) => {
              if (e.target.checked) {
                setLanguage("th");
              } else {
                setLanguage("en");
              }
            }}
            size="lg"
            startContent={<p>TH</p>}
            endContent={<p>EN</p>}
          />
        </div>
        <title>KU GenEd Credit Count - Result Page</title>
        <GenEdCard
          title={language === "th" ? "กลุ่มสาระอยู่ดีมีสุข" : "Wellness"}
          credit={gened.Wellness}
          max_credit={6}
          subject_list={subjectlist.Wellness}
          language={language}
        />
        <GenEdCard
          title={
            language === "th"
              ? "กลุ่มสาระศาสตร์แห่งผู้ประกอบการ"
              : "Entrepreneurship"
          }
          credit={gened.Entrepreneurship}
          max_credit={3}
          subject_list={subjectlist.Entrepreneurship}
          language={language}
        />
        <GenEdCard
          title={
            language === "th"
              ? "กลุ่มสาระพลเมืองไทยและพลเมืองโลก"
              : "Thai Citizen and Global Citizen"
          }
          credit={gened.Thai_Citizen_and_Global_Citizen}
          max_credit={5}
          subject_list={subjectlist.Thai_Citizen_and_Global_Citizen}
          language={language}
        />
        <GenEdCard
          title={
            language === "th"
              ? "กลุ่มสาระภาษาและการสื่อสาร"
              : "Language and Communication"
          }
          credit={gened.Language_and_Communication}
          max_credit={13}
          subject_list={subjectlist.Language_and_Communication}
          language={language}
        />
        <GenEdCard
          title={language === "th" ? "กลุ่มสาระสุนทรียศาสตร์" : "Aesthetics"}
          credit={gened.Aesthetics}
          max_credit={3}
          subject_list={subjectlist.Aesthetics}
          language={language}
        />
        <GenEdCard
          title={language === "th" ? "วิชาเสรี" : "Others"}
          credit={gened.Others}
          max_credit={6}
          subject_list={subjectlist.Others}
          language={language}
        />
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
