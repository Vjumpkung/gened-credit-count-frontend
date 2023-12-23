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
}: {
  title: string;
  credit: number;
  max_credit: number;
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
            {credit} / {max_credit} หน่วยกิต
          </p>
        </div>
      </CardBody>
    </Card>
  );
}
