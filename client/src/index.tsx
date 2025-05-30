import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(`/f${(+new Date()).toString(16)}`);
  });

  return (
    <div className="app">
      <h1>Paint Online</h1>
      <p>Loading...</p>
    </div>
  );
};

export default Index;
