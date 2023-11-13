import { Container } from "@mui/system";
import { useNavigate } from "react-router-dom";
import HudzzButton from "../components/CustomButton";
import FormHeader from "../headers/FormHeader";

export default function Landing() {
  const navigate = useNavigate();
  return (
    <>
      <FormHeader title={"Choose Statement Type"} />
      <Container
        style={{
          display: "flex",
          flexDirection: "column",
          height: "calc(var(--hudzz-view-height) - 70px)",
        }}
      >
        <HudzzButton
          style={{ fontSize: "1.5rem", height: 120, marginTop: 20 }}
          type="button"
          onClick={() => navigate("/cash")}
        >
          Cash
        </HudzzButton>
        <HudzzButton
          style={{ fontSize: "1.5rem", height: 120, marginTop: 20 }}
          type="button"
          onClick={() => navigate("/financing")}
        >
          Financing
        </HudzzButton>
        <HudzzButton
          style={{ fontSize: "1.5rem", height: 120, marginTop: 20 }}
          type="button"
          onClick={() => navigate("/sellersheet")}
        >
          Seller Net Sheet
        </HudzzButton>
      </Container>
    </>
  );
}
