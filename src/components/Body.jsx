import { Outlet, useNavigate } from "react-router"
import NavBar from "./NavBar"
import Footer from "./Footer"
import axios from "axios"
import {BASE_URL} from '../utils/constants'
import { useDispatch, useSelector } from "react-redux"
import { addUser } from "../utils/userSlice"
import { useEffect } from "react"

const Body=()=>{

    const navigate=useNavigate()
    const dispatch=useDispatch()
    const userData=useSelector((store)=>store.user)

    const fetchUser=async()=>{
        if(userData) return
        try{
            const res=await axios.get(BASE_URL+"/profile/view",
            {
                withCredentials:true
            }
        )
        dispatch(addUser(res.data))

        } catch(err){
            console.log(err)
            if(err.status===401){
                navigate("/login")
            }
            console.error(err)
        }
    }

    useEffect(()=>{
        fetchUser()
    },[userData])
 return(
    <div>
        <NavBar/>
        <Outlet/>
        <Footer/>
    </div>
 )
}
export default Body