import { createContext, useState, useEffect } from "react";
import axios from 'axios';


export const questionsContext = createContext()


const Provider = ({ children }) => {
    const [questions, setQuestions] = useState([])
    const dataUrl = "https://interview-preparation-aa76e-default-rtdb.firebaseio.com/data.json"

    const fetchQuestions = async () => {
        const res = await (await axios.get(dataUrl)).data
        const loadedQs = []
        for (const key in res) {
            loadedQs.push(res[key])
        }
        setQuestions(loadedQs)
    }

    useEffect(() => {
        fetchQuestions()
    }, [])

    const myData = {
        questions: questions,
        setQuestions: setQuestions
    }

    return (
        <questionsContext.Provider value={myData}>
            {children}
        </questionsContext.Provider>
    )
}

export default Provider