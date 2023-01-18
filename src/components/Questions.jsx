import QuestionComponent from "./QuestionComponent"
import classes from "./Questions.module.css"


const Questions = ({ questions }) => {

    return (
        <div className={classes.container}>
            {questions.map(item => {
                return (
                    <QuestionComponent question={item} />
                )
            })}
        </div>
    )

}

export default Questions