import {Header} from "../header";
import { Outlet } from "react-router";

export function Layout() {
 return (
   <div>
      <>
        <Header/>
        <Outlet/>
      </>
   </div>
 );
}