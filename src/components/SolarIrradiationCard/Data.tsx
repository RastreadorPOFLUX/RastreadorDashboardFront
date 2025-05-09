interface Data {
  dateTime: string;
  hour: string;
  day: number;
  month: number;
  year: number;
  value: number;
  expected: number;
  eficiency: number;
}

export default function getData(): Data[] {
  return [
    {
      dateTime: "1-1-2025-15:00:00",
      hour: "15h",
      day: 1,
      month: 1,
      year: 2025,
      value: 1100,
      expected: 1200,
      eficiency: (1100/1200)*100
    },
    {
      dateTime: "1-1-2025-16:00:00",
      hour: "16h",
      day: 1,
      month: 1,
      year: 2025,
      value: 100,
      expected: 1200,
      eficiency: (100/1200)*100
    },
    {
      dateTime: "1-1-2025-17:00:00",
      hour: "17h",
      day: 1,
      month: 1,
      year: 2025,
      value: 1100,
      expected: 1200,
      eficiency: (1100/1200)*100
    },
    {
      dateTime: "1-1-2025-18:00:00",
      hour: "18h",
      day: 1,
      month: 1,
      year: 2025,
      value: 1250,
      expected: 1200,
      eficiency: (1250/1250)*100
    },
    {
      dateTime: "1-1-2025-19:00:00",
      hour: "19h",
      day: 1,
      month: 1,
      year: 2025,
      value: 1300,
      expected: 1350,
      eficiency: (1300/1350)*100
    },
    {
      dateTime: "1-1-2025-20:00:00",
      hour: "20h",
      day: 1,
      month: 1,
      year: 2025,
      value: 1000,
      expected: 1200,
      eficiency: (1000/1200)*100
    },
    {
      dateTime: "1-1-2025-21:00:00",
      hour: "21h",
      day: 1,
      month: 1,
      year: 2025,
      value: 1100,
      expected: 1200,
      eficiency: (1100/1200)*100
    },
    {
      dateTime: "1-1-2025-22:00:00",
      hour: "22h",
      day: 1,
      month: 1,
      year: 2025,
      value: 1200,
      expected: 1200,
      eficiency: (1200/1250)*100
    },
    {
      dateTime: "1-1-2025-23:00:00",
      hour: "23h",
      day: 1,
      month: 1,
      year: 2025,
      value: 1200,
      expected: 1350,
      eficiency: (1200/1350)*100
    },
  ];
}
