import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Button, Paper } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

type FormHeaderProps = {
  title: string;
};

const FormHeader = ({ title }: FormHeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <Paper
      sx={{
        alignItems: "center",
        backgroundColor: "var(--hudzz-closing-disclosure-generator-primary-color)",
        borderRadius: 0,
        color: "var(--hudzz-closing-disclosure-generator-text-color)",
        display: "flex",
        height: "50px",
        paddingLeft: 2,
        paddingRight: 2,
        position: "sticky",
        top: 0,
        verticalAlign: "middle",
        zIndex: 100,
      }}
    >
      <div style={{ flex: 2 }}>
        <Button
          sx={{
            alignContent: "flex-start",
            color: "var(--hudzz-closing-disclosure-generator-text-color)",
            display: location.pathname === "/landing" ? "none" : "flex",
          }}
          onClick={() => navigate("/landing")}
        >
          <ArrowBackIosIcon />
          Back
        </Button>
      </div>
      <span style={{ flex: 4, textAlign: "center" }}>{title}</span>
      <div style={{ flex: 2 }}></div>
    </Paper>
  );
};

export default FormHeader;
