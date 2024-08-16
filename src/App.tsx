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
import { NameProvider } from "./components/NameContext.tsx";
import {
  DarkModeProvider,
  useDarkMode,
} from "./components/DarkModeContext.tsx";
import ConfigButtons from "./components/ConfigButtons.tsx";

function AppContent() {
  const { darkMode } = useDarkMode();

  const theme = createTheme({
    palette: {
      primary: {
        light: darkMode ? "#4f7eb4" : "#4f7eb4",
        main: darkMode ? "#4f7eb4" : "#4f7eb4",
        dark: darkMode ? "#96b9e3" : "#96b9e3",
        contrastText: "#ffffff",
      },
      secondary: {
        light: darkMode ? "#424242" : "#ffffff",
        main: darkMode ? "#303030" : "#ffffff",
        dark: darkMode ? "#212121" : "#f5f5f5",
        contrastText: darkMode ? "#ffffff" : "#000000",
      },
      mode: darkMode ? "dark" : "light",
    },
    typography: {
      fontFamily: ["sans-serif"].join(","),
      h1: { fontSize: "6rem" },
      h2: { fontSize: "3rem" },
      h3: { fontSize: "2rem" },
      h4: { fontSize: "1.5rem" },
      h5: { fontSize: "1.25rem" },
      h6: { fontSize: "1rem" },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <BrowserRouter>
          <ConfigButtons />
          <Suspense>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Scheduler" element={<Scheduler />} />
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}

export default function App() {
  return (
    <DarkModeProvider>
      <NameProvider>
        <AppContent />
      </NameProvider>
    </DarkModeProvider>
  );
}
