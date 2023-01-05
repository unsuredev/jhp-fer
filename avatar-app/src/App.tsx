import { useEffect, useLayoutEffect } from "react";
import "./App.css";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { Layout } from "layouts";
import { Page404 } from "pages/Page404";
import { LoginPage } from "pages/LoginPage";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { loadUser, selectAuth } from "app/services/auth/authSlice";
import { isTokenExpired } from "app/services/UtilServices";
import { DashboardPage } from "pages/DashboardPage";
import { UserPage } from "pages/UserPage";
import { DailyReportPage } from "pages/DailyReportPage";
import { FingerPrintPage } from "pages/FingerprintPage";
import { ImageUploadPage } from "pages/FileUploadPage";

import { ROUTES } from "definitions/constant/routes";

function App() {
  // route
  const navigate = useNavigate();
  const location = useLocation();
  // redux
  const auth = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();

  // hooks
  useLayoutEffect(() => {
    dispatch(loadUser());
  }, []);

  useEffect(() => {
    const isExpired = isTokenExpired(auth.token);
    const pathName = location.pathname;
    if (!isExpired) {
      navigate(pathName === ROUTES.login ? ROUTES.dashboard : pathName, {
        replace: true,
      });
    } else navigate(ROUTES.login, { replace: true });
  }, [auth.token]);

  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path={ROUTES.root} element={<Layout />}>
            <Route path={ROUTES.dashboard} element={<DashboardPage />} />
            <Route path={ROUTES.user} element={<UserPage />} />
            <Route path={ROUTES.fingerPrint} element={<FingerPrintPage />} />
            <Route path={ROUTES.dailyReport} element={<DailyReportPage />} />
            <Route path={ROUTES.imageUpload} element={<ImageUploadPage />} />
          </Route>
          <Route path={ROUTES[404]} element={<Page404 />} />
          <Route path={ROUTES.login} element={<LoginPage />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
