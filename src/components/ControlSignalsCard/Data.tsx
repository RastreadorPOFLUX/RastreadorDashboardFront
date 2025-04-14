interface Data {
  dateTime: string;
  hour: string;
  day: number;
  month: number;
  year: number;
  controle: number;
  erro: number;
  output: number;
}

export default function getData(): Data[] {
  return [
    {
      dateTime: "1-1-2025-15:00:00",
      hour: "15h",
      day: 1,
      month: 1,
      year: 2025,
      controle: 100,
      erro: 50,
      output: 10,
    },
    {
      dateTime: "1-1-2025-16:00:00",
      hour: "16h",
      day: 1,
      month: 1,
      year: 2025,
      controle: 100,
      erro: 50,
      output: 10,
    },
    {
      dateTime: "1-1-2025-17:00:00",
      hour: "17h",
      day: 1,
      month: 1,
      year: 2025,
      controle: 100,
      erro: 50,
      output: 10,
    },
    {
      dateTime: "1-1-2025-18:00:00",
      hour: "18h",
      day: 1,
      month: 1,
      year: 2025,
      controle: 120,
      erro: 50,
      output: 10,
    },
    {
      dateTime: "1-1-2025-19:00:00",
      hour: "19h",
      day: 1,
      month: 1,
      year: 2025,
      controle: 100,
      erro: 70,
      output: 10,
    },
    {
      dateTime: "1-1-2025-20:00:00",
      hour: "20h",
      day: 1,
      month: 1,
      year: 2025,
      controle: 100,
      erro: 20,
      output: 60,
    },
    {
      dateTime: "1-1-2025-21:00:00",
      hour: "21h",
      day: 1,
      month: 1,
      year: 2025,
      controle: 200,
      erro: 50,
      output: 10,
    },
    {
      dateTime: "1-1-2025-22:00:00",
      hour: "22h",
      day: 1,
      month: 1,
      year: 2025,
      controle: 200,
      erro: 30,
      output: 10,
    },
    {
      dateTime: "1-1-2025-23:00:00",
      hour: "23h",
      day: 1,
      month: 1,
      year: 2025,
      controle: 100,
      erro: 40,
      output: 10,
    },
  ];
}
