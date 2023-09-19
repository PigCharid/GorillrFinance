import React from "react";
import { Route, Routes } from "react-router-dom";
import { SiderBar, TopBar } from "./components/Narv";
import { Stake } from "./pages/Stake";
import { Swap } from "./pages/Swap";

function App() {
  return (
    <div className="relative sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-row text-white">
      <div className="sm:flex hidden mr-10 relative">
        <SiderBar />
    
      </div>

      <div className="flex-1 max-sm:w-full mx-auto">
        <TopBar />
        <Routes>
          <Route path="/" element={<Swap />}/>
          <Route path="/swap" element={<Swap />} />
          <Route path="/stake" element={<Stake />} />
        </Routes>
      </div>
    
    </div>
  );
}

export default App;
