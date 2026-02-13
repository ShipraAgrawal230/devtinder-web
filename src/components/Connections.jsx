import axios from "axios"
import { useEffect } from "react"
import { BASE_URL } from "../utils/constants"
import { useDispatch, useSelector } from "react-redux"
import { addConnections } from "../utils/connectionSlice"

const Connections = () => {

    const dispatch = useDispatch()
    const connections = useSelector((store) => store.connections)

    const fetchConnections = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/connections", { withCredentials: true })
            dispatch(addConnections(res.data?.data))
        } catch (err) {

        }
    }
    useEffect(() => {
        fetchConnections()
    }, [])

    if (!connections) return;
    if (connections.length === 0) return <h1>No Connections Found</h1>

    return (
        <div className="text-center my-10">
            <h1 className="font-bold text-3xl">Connections</h1>
            {
                connections.map((connection) => {
                    const { firstName, lastName, photoUrl, age, gender, about, _id } = connection
                    return <div className="m-4 p-4 rounded-lg bg-base-200 flex w-1/2 mx-auto" key={_id}>
                        <div><img alt="photo" src={photoUrl} className="w-20 h-20 rounded-full" /></div>
                        <div className="text-left mx-4">
                            <h2 className="font-bold text-xl">{firstName + " " + lastName}</h2>
                            <h2>{about}</h2>
                        </div>
                    </div>
                })
            }
        </div>
    )
}
export default Connections