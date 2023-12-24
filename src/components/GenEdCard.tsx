import { components } from "@/schema";
import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Progress,
} from "@nextui-org/react";

export default function GenEdCard({
  title,
  credit,
  max_credit,
  subject_list,
  language,
}: {
  title: string;
  credit: number;
  max_credit: number;
  subject_list: components["schemas"]["SubjectDto"][];
  language: "th" | "en";
}) {
  return (
    <Card className="w-full">
      <CardHeader className="flex gap-3">
        <div className="flex flex-col">
          <p className="text-xl font-bold">{title}</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <Progress
          size="lg"
          value={(credit / max_credit) * 100}
          aria-label="Progress"
        />
        <div className="w-full">
          <p className="text-right font-bold pt-1 text-xl">
            {credit} / {max_credit} {language === "th" ? "หน่วยกิต" : "Credits"}
          </p>
        </div>
        {credit !== 0 ? <Divider /> : <></>}
        <div className="w-full">
          {subject_list.map((subject) => {
            return (
              <div className="flex">
                <div className="flex-none pr-4">
                  <p className="font-bold">{subject.subject_code}</p>
                </div>
                <div className="flex-grow">
                  <p className="text-left">
                    {" "}
                    {language === "th"
                      ? subject.subject_name_th
                      : subject.subject_name_en}
                  </p>
                </div>
                <div className="flex-grow">
                  <p className="text-right">
                    {subject.credits}{" "}
                    {language === "th" ? "หน่วยกิต" : "Credits"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardBody>
    </Card>
  );
}
