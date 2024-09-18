import "./App.css";
import "./index.css";

import { ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import Cash from "./activities/Cash.tsx";
import Financing from "./activities/Financing.tsx";
import FinishedActivity from "./activities/FinishedActivity.tsx";
import SellerNetSheet from "./activities/SellerNetSheet.tsx";
import { HudzzApi } from "./api/HudzzApi.ts";
import Landing from "./forms/Landing.tsx";
import { theme } from "./themes/hudzzTheme.ts";

const routes = [
  {
    element: <Landing />,
    path: "/landing",
  },
  {
    element: <Cash />,
    path: "/cash",
  },
  {
    element: <Financing />,
    path: "/financing",
  },
  {
    element: <SellerNetSheet />,
    path: "/sellersheet",
  },
  {
    element: <FinishedActivity />,
    path: "/done",
  },
];

const router = createMemoryRouter(routes, {
  initialEntries: ["/landing"],
  initialIndex: 0,
});

function App() {
  const [isVerified, setIsVerified] = useState<boolean | null>(null);

  useEffect(() => {
    const checkVerification = async () => {
      try {
        const response = await HudzzApi.verify();
        console.log(response);
        console.log("AIds!");
        const result = response.status === 200;
        setIsVerified(result);
      } catch (error) {
        console.error("Verification failed", error);
        setIsVerified(false);
      }
    };

    checkVerification().catch((error) => {
      console.error("Error during verification.", error);
    });
  }, []);

  if (isVerified === null) {
    return <div style={{ margin: "auto", marginTop: "10px" }}>Verifying license...</div>;
  }

  if (isVerified === false) {
    return (
      <div style={{ margin: "auto", marginTop: "10px" }}>
        License verification failed. Please contact us at{" "}
        <a href="mailto:hudzzteam@gmail.com?subject=Hudzz%20Plugin%20verification%20failed">
          hudzzteam@gmail.com
        </a>
      </div>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
