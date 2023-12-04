import{Route,Redirect} from"react-router-dom"
import { Outlet,Navigate } from "react-router-dom" //outlet is basically what we wanna return 
import { UseSelector, useSelector } from "react-redux"

const PrivateRoute = () => {
  const {userInfo}=useSelector(state=>state.auth)


  return (userInfo?<Outlet />:<Navigate to="/login" replace />) //replace to replace any past history)

}

export default PrivateRoute