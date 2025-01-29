import { Card, CardBody } from "@material-tailwind/react";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../Context/AppContext";

export default function Home() {
    const {user,token} = useContext(AppContext)

    const [summary, setSummary] = useState([])

    async function getSummary() {
        const res = await fetch('/api/todos/summary', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        const data = await res.json()

        // console.log(data)

        if(res.ok) {
            setSummary(data)
            // console.log(data)
        }
    }

    useEffect(()=>{
        getSummary()
    }, [])

    return (
        <>
            <div className="mt-5">
                <h1 className="text-4xl font-bold">Hey, Welcome Back {user.name}</h1>
                <p className="text-lg text-dark">This is your dashboard, have a great day!</p>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-10">
                <Card className="2-96">
                    <CardBody>
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold">To Do</h1>
                        <h1 className="text-2xl font-bold text-blue-500">{summary.pending}</h1>
                    </div>
                    </CardBody>
                </Card>
                <Card className="2-96">
                    <CardBody>
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold">Completed</h1>
                        <h1 className="text-2xl font-bold text-green-400">{summary.completed}</h1>
                    </div>
                    </CardBody>
                </Card>
            </div>
        </>
    )
}