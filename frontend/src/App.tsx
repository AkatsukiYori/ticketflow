import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserRouter from "./routes/UserRouter";
import AdminRouter from "./routes/AdminRouter";
import { SnackbarProvider } from "notistack";

export default function App() {
  return (
    <SnackbarProvider maxSnack={3} autoHideDuration={3000} anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<UserRouter />} />
          <Route path="/admin/*" element={<AdminRouter />} />
        </Routes>
      </BrowserRouter>
    </SnackbarProvider>
  );
}
