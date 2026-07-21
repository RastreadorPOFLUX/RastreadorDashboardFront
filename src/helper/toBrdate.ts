// Converte YYYY-MM-DD (formato do filtro de datas) para dd/mm/yyyy
const toBrDate = (isoDate: string) => {
  const [year, month, day] = isoDate.split("-");
  return `${day}/${month}/${year}`;
};

export default toBrDate;