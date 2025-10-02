import { useUser } from "@/context/userContext";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

type props = {
  children: React.ReactNode;
};

const AuthNeeded = ({ children }: props) => {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      console.log(user);
      navigate("/login");
    }
  }, []);
  return <>{children}</>;
};

export default AuthNeeded;
