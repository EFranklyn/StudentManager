import React from "react";
import AppRoutes from "./routes";
import { ModalProvider } from "./contexts/ModalContext";
import ModalWrapper from "./components/modals/ModalWrapper";

const App: React.FC = () => {
  return (
    <ModalProvider>
      <AppRoutes />
      <ModalWrapper />
    </ModalProvider>
  );
};

export default App;