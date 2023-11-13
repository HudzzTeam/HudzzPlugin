import "./App.css";
import "./index.css";

import { ThemeProvider } from "@mui/material/styles";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import Cash from "./activities/Cash.tsx";
import Financing from "./activities/Financing.tsx";
import FinishedActivity from "./activities/FinishedActivity.tsx";
import SellerNetSheet from "./activities/SellerNetSheet.tsx";
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
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
