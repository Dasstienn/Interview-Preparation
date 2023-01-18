import classes from "./Card.module.css"
import "./FlipTransition.css"

const Card = ({onClick, question}) => {

    return (
        <div className={classes.card} onClick={onClick}>
            <div className={classes["card-front"]}>{question.question}</div>
            <div className={classes["card-back"]}>{question.answer}</div>
        </div>
    )
}

export default Card