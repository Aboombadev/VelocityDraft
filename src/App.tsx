import * as React from "react";
import { Suspense } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";

import Home from "./pages/Home.tsx";
import NotFound from "./pages/NotFound.tsx";
import Scheduler from "./pages/Scheduler.tsx";
import InfoBubble from "./components/InfoBubble.tsx";
import { NameProvider } from "./components/NameContext.tsx";

const theme = createTheme({
  palette: {
    primary: {
      light: "#96b9e3",
      main: "#5d94d4",
      dark: "#4f7eb4",
      contrastText: "#ffffff", // White
    },
    secondary: {
      light: "#ffffff",
      main: "#ffffff",
      dark: "#ffffff",
      contrastText: "#000000", // Black
    },
    mode: "light",
  },
  typography: {
    fontFamily: ["Nunito", "sans-serif"].join(","),
    h1: {
      fontSize: "6rem",
    },
    h2: {
      fontSize: "3rem",
    },
    h3: {
      fontSize: "2rem",
    },
    h4: {
      fontSize: "1.5rem",
    },
    h5: {
      fontSize: "1.25rem",
    },
    h6: {
      fontSize: "1rem",
    },
  },
});

export default function App({}) {
  return (
    <ThemeProvider theme={theme}>
      <NameProvider>
        <Container>
          {/*container is for margins lol */}
          <BrowserRouter>
            <InfoBubble />
            <Suspense>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Scheduler" element={<Scheduler />} />
                <Route path="/*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </Container>
      </NameProvider>
    </ThemeProvider>
  );
}
