import { Route, Routes } from "react-router-dom";
import App from "./App.tsx";
import Index from "./index.tsx";

const RoutesApp = () => {
  return (
    <Routes>
      <Route path="/:id" element={<App />} />
      <Route index={true} element={<Index />} />
    </Routes>
  );
};

export default RoutesApp;
