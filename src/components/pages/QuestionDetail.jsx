import { useContext, useEffect, useState } from "react"
import { useParams, Link } from 'react-router-dom'
import { questionsContext } from "../../store/questions-context"
import classes from "./QuestionDetail.module.css"



const QuestionDetail = () => {
    const params = useParams()
    const { questions } = useContext(questionsContext)

    return (
        <div>
            <p><Link to=".." relative="path">Back</Link></p>

            {questions.map(el => {
                if (el.id === params.questionId) {
                    return (
                        <>
                            <div className={classes["main-author"]}>
                                <p>{el.author}</p>
                                <div className={classes["main-content"]}>
                                    <h2>{el.question}</h2>
                                    <p>{el.answer}</p>
                                </div>
                            </div>
                            {Object.keys(el.answers).map(key => {
                                if (key !== "null") {
                                    return (
                                        <div className={classes["secondary-author"]}>
                                            <p>{key}</p>
                                            <div className={classes["secondary-content"]}>
                                                <p>{el.answers[key]}</p>
                                            </div>
                                        </div>
                                    )
                                }
                            })}
                        </>
                    )
                }
            })}

        </div>
    )
}

export default QuestionDetail