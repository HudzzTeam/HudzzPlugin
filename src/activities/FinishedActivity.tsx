import { Button, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { useNavigate } from "react-router-dom";
import FormHeader from "../headers/FormHeader";

import { WP_PRIMARY_COLOR_AND_BACKGROUND_COLOR } from "../themes/wordpressTheme";

export default function FinishedActivity() {
  const navigate = useNavigate();
  return (
    <>
      <FormHeader title={"Success"} />
      <Container
        style={{
          display: "flex",
          flexDirection: "column",
          height: "calc(var(--hudzz-view-height) - 70px)",
        }}
      >
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            marginTop: 10,
            paddingLeft: 10,
            paddingRight: 10,
          }}
        >
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{
                color: "var(--hudzz-input-text-color)",
                fontSize: "2em",
                padding: 5,
                textAlign: "center",
              }}
            >
              Check your email for your document!
            </Typography>
          </Box>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              size="large"
              variant="contained"
              sx={{
                padding: 2,
                width: "35%",
                ...WP_PRIMARY_COLOR_AND_BACKGROUND_COLOR,
              }}
              onClick={() => {
                navigate("/landing", { state: { reset: true } });
              }}
            >
              Generate a new document
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}
