import "./App.css";
import { Outlet, Route, Routes, Navigate, useLocation } from "react-router-dom";
import { Spin } from "antd";
import Login from "./Authorization/Login";
import Homepage from "./AppLayout/Homepage";
import { useEffect, useState } from "react";
import Dispatch from "./Masters/AllFIles/Dispatch";
import DemoPie from "./Masters/AllFIles/DaywiseComGraph";
import FileTable from "./Masters/AllFIles/FileTable";
import Dumpfile from "./Masters/AllFIles/DumpfIle";
import MySearchComponent from "./AppLayout/MySearchComponent";
// import Dashboard_tabs from "./Masters/AllFIles/Dashboard_tabs"
function App() {
  let location = useLocation();

  var [loading, setLoading] = useState(true);
  var [isverified, setIsVerified] = useState(true);

  function validateLogin() {
    setLoading(true);
    if (localStorage.getItem("isLoggedIn")) {
      setIsVerified(true);
    }
    setLoading(false);
  }

  useEffect(() => {
    validateLogin();
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route
          path="*"
          element={
            loading ? (
              <div className="App" style={{ textAlign: "center" }}>
                <Spin size="large" style={{ marginTop: "50px" }} />
              </div>
            ) : isverified ? (
              <>
                <Homepage />
                <MySearchComponent />
              </>
            ) : (
              <Navigate
                to="/login"
                replace={true}
                state={{ from: location.pathname + location.search }}
              />
            )
          }
        >
          <Route path="masters" element={<Outlet />}>
            <Route path="allfiles" element={<Outlet />}>
              <Route path="filetable" element={<FileTable />} />
              <Route path="dumpfile" element={<Dumpfile />} />
              <Route path="dispatch" element={<Dispatch />} />
              <Route path="dashboardreader" element={<DemoPie />} />
              {/* <Route path="dashboard_tabs" element={<Dashboard_tabs />} /> */}
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
