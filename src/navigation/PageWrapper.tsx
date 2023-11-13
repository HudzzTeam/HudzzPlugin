import React, { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import HudzzButton from "../components/CustomButton";

interface PageWrapperProps {
  children: ReactNode;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
  const navigate = useNavigate();

  return (
    <div>
      <header>
        <HudzzButton
          onClick={() => {
            navigate(-1);
          }}
        >
          Back
        </HudzzButton>
      </header>
      {children}
    </div>
  );
};
export default PageWrapper;
