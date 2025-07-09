interface Data {
  value: number;
}

export default function getData(): Data[] {
  return [
    {
      value: 60,
    },
    {
      value: 80,
    },
  ];
}
