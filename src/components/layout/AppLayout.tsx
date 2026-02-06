import { Outlet } from "react-router-dom";

import Header from "./Header";

const AppLayout = () => {
  return (
    <>
      <Header />

      <main className="container flex flex-1 flex-col mx-auto">
        <Outlet />
      </main>
    </>
  );
};

export default AppLayout;
