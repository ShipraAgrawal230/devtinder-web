import axios from "axios"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { addUser } from "../utils/userSlice"
import { useNavigate } from "react-router"
import { BASE_URL } from '../utils/constants'

const Login = () => {

    const dispatch = useDispatch()
    const [emailId, setEmailId] = useState("")
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [isLoginForm, setIsLoginForm] = useState(true)
    const navigate = useNavigate()

    const handleLogin = async () => {
        try {
            const res = await axios.post(BASE_URL + "/login", {
                emailId, password
            },
                {
                    withCredentials: true
                })
            dispatch(addUser(res.data.data))
            navigate("/")
        }
        catch (e) {
            console.log(e)
            throw new Error(e.message)
        }
    }

    const handleSignup = async () => {
        try {
            const res = await axios.post(BASE_URL + "/signup",
                {
                    firstName, lastName, emailId, password
                },
                { withCredentials: true }
            )
            dispatch(addUser(res.data.data))
            navigate("/profile")
        }
        catch (e) {
            console.log(e)
            throw new Error(e.message)
        }
    }

    return (
        <div className="flex justify-center my-10">
            <div className="card bg-base-300 w-96 shadow-sm">
                <div className="card-body">
                    <h2 className="card-title justify-center">{isLoginForm ? "Login" : "Sign Up"}</h2>
                    <div className="py-4">
                        {!isLoginForm && <>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend" value={firstName}>First Name</legend>
                                <input type="text" className="input"
                                    onChange={(e) => { setFirstName(e.target.value) }} />
                            </fieldset>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend" value={lastName}>Last Name</legend>
                                <input type="text" className="input"
                                    onChange={(e) => { setLastName(e.target.value) }} />
                            </fieldset>
                        </>}
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Email Id</legend>
                            <input type="text" className="input" value={emailId}
                                onChange={(e) => { setEmailId(e.target.value) }} />
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend" value={password}>Password</legend>
                            <input type="text" className="input"
                                onChange={(e) => { setPassword(e.target.value) }} />
                        </fieldset>
                    </div>
                    <div className="card-actions justify-center m-2">
                        <button className="btn btn-primary" onClick={isLoginForm ? handleLogin : handleSignup}>{isLoginForm ? "Login" : "Sign Up"}</button>
                    </div>
                    <p onClick={() => { setIsLoginForm(value => !value) }} className="text-center cursor-pointer">{isLoginForm ? "New User? Signup here" : "Existing User? Login here"}</p>
                </div>
            </div>
        </div>
    )
}

export default Login