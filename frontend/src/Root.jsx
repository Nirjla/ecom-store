import { Outlet } from "react-router-dom";
import NavBar from "./components/global/NavBar";

export default function Root(){
      return(
            <>
            <NavBar/>
            <Outlet/>
            </>
      )
}