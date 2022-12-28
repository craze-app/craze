import React, {useEffect, useState} from "react";
import Sidebar from "../components/partials/Sidebar";

type MainLayoutProps = {
  children: React.ReactNode
}

const MainLayout = ({children}: MainLayoutProps) => {

  const [bg, setBg] = useState('rgba(60,65,75,0.75)')

  useEffect(() => {
    window.addEventListener("blur", onBlur)
    window.addEventListener("focus", onFocus)
    return () => {
      window.removeEventListener("focus", onFocus)
      window.removeEventListener("blur", onBlur)
    };
  }, []);

  const onFocus = () => {
    setBg('transparent')
  }

  const onBlur = () => {
    setBg('#202932')
  }

  return (
    <div style={{width: "100%", display: "flex"}}>
      <Sidebar backgroundColor={bg}  />
      <div className={"main-layout-content"}>
        {children}
      </div>
    </div>
  )
}

export default MainLayout
