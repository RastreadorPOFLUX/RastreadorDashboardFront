import React, { createContext, useContext, useState, ReactNode } from "react";

// Definindo os tipos para o contexto
interface DateContextType {
  BeginDate: string;
  setBeginDate: React.Dispatch<React.SetStateAction<string>>;
  EndDate: string;
  setEndDate: React.Dispatch<React.SetStateAction<string>>;
}

// Criando o contexto com os tipos definidos
const DateContext = createContext<DateContextType | undefined>(undefined);

// Hook para consumir o contexto
export const useDateContext = (): DateContextType => {
  const context = useContext(DateContext);
  if (!context) {
    throw new Error("useDateContext must be used within a DateProvider");
  }
  return context;
};

// Componente que provê o Date para os componentes filhos
interface DateProviderProps {
  children: ReactNode;
}

export const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const DateProvider: React.FC<DateProviderProps> = ({ children }) => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const todayFormatted = formatDate(today);
  const yesterdayFormatted = formatDate(yesterday);

  const [BeginDate, setBeginDate] = useState(yesterdayFormatted);
  const [EndDate, setEndDate] = useState(todayFormatted);

  return (
    <DateContext.Provider
      value={{ BeginDate, setBeginDate, EndDate, setEndDate }}
    >
      {children}
    </DateContext.Provider>
  );
};
