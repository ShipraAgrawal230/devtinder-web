import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { useDispatch } from "react-redux"
import { removeFeed } from "../utils/feedSlice"

const UserCard = ({user}) => {
    const dispatch=useDispatch()
    const handleSendRequest=async(status)=>{
        try{
            const res=await axios.post(BASE_URL+"/request/send/"+status+"/"+user._id,{},{withCredentials:true})
            dispatch(removeFeed(user._id))
        } catch(err){

        }
    }
    return (
        <div className="card bg-base-100 w-96 shadow-sm">
  <figure>
    <img
      src={user.photoUrl}
      alt="user photo" />
  </figure>
  <div className="card-body">
    <h2 className="card-title justify-center">{user.firstName+" "+user.lastName}</h2>
    <p className="mx-auto">{user.about}</p>
    <div className="card-actions justify-center my-2">
      <button className="btn btn-primary" onClick={()=>{handleSendRequest("ignored")}}>Ignore</button>
      <button className="btn btn-secondary" onClick={()=>{handleSendRequest("interested")}}>Send Request</button>
    </div>
  </div>
</div>
    )
}
export default UserCard


