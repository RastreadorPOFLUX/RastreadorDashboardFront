import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

// Definindo os tipos para o contexto
interface DateContextType {
  BeginDate: string;
  setBeginDate: React.Dispatch<React.SetStateAction<string>>;
  EndDate: string;
  setEndDate: React.Dispatch<React.SetStateAction<string>>;
  screen?: string; // Adicionando screen ao contexto
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
  screen?: string; // Adicionando screen como prop
}

export const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const DateProvider: React.FC<DateProviderProps> = ({ children, screen = "general" }) => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const todayFormatted = formatDate(today);
  const yesterdayFormatted = formatDate(yesterday);

  // Estado inicial baseado na screen
  const [BeginDate, setBeginDate] = useState(
    screen === "electrical" ? todayFormatted : yesterdayFormatted
  );
  const [EndDate, setEndDate] = useState(
    screen === "electrical" ? todayFormatted : todayFormatted
  );

  // Efeito para atualizar as datas quando a screen mudar
  useEffect(() => {
    if (screen === "electrical") {
      // Para electrical: ambas as datas são a data atual
      const currentDate = formatDate(new Date());
      setBeginDate(currentDate);
      setEndDate(currentDate);
    } else {
      // Para outras screens: comportamento padrão
      setBeginDate(yesterdayFormatted);
      setEndDate(todayFormatted);
    }
  }, [screen, todayFormatted, yesterdayFormatted]);

  return (
    <DateContext.Provider
      value={{ BeginDate, setBeginDate, EndDate, setEndDate, screen }}
    >
      {children}
    </DateContext.Provider>
  );
};