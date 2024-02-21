import { Route, Routes } from "react-router-dom";
import * as Pages from '@/pages'


export function Routers() {
  return (
    <Routes>
      <Route path="/" element={<Pages.Home />} />
      <Route
        path="/register"
        element={<Pages.Register />}
      />
    </Routes>
  );
};