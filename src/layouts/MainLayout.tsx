import React, {useEffect, useState} from "react";
import Sidebar from "../components/partials/sidebar/Sidebar";
import useWindowFocus from "../hooks/utils/useWindowFocus";

type MainLayoutProps = {
  children: React.ReactNode
}

const MainLayout = ({children}: MainLayoutProps) => {

  const [sidebarBackground, setSidebarBackground] = useState('transparent')
  const {isFocused} = useWindowFocus()

  useEffect(() => {
    if(isFocused){
      setSidebarBackground('transparent')
    }else{
      setSidebarBackground('#202932')
    }
  }, [isFocused])

  return (
    <div style={{width: "100%", height: "100vh", display: "flex"}}>
      <Sidebar backgroundColor={sidebarBackground}  />
      <div className={"main-layout-content"}>
        {children}
      </div>
    </div>
  )
}

export default MainLayout
