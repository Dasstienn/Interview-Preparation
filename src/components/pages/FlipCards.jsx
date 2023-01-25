import FlipCard from "../flipcard/FlipCard";
import { useState, useContext } from "react";
import { questionsContext } from "../context/Context"
import classes from "./FlipCards.module.css"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';



const FlipCards = () => {
    const { questions } = useContext(questionsContext)
    const [idx, setIdx] = useState(0)
    const [showFront, setShowFront] = useState(true)

    const prevClick = () => {
        if (idx >= 1) {
            const num = idx - 1
            setIdx(num)
            setShowFront(true)
        }
    }

    const nextClick = () => {
        if (idx < questions.length - 1) {
            const num = idx + 1
            setIdx(num)
            setShowFront(true)
        }
    }

    const handleFlip = () => {
        setShowFront((prevState) => !prevState)
    }

    return (
        <div className={classes.area}>
            <button className={classes.btn} onClick={prevClick} disabled={idx === 0 ? true : false}><ArrowBackIosIcon /></button>
            <FlipCard question={questions[idx] ?? {}} showFront={showFront} setFlip={handleFlip} />
            <button className={classes.btn} onClick={nextClick} disabled={idx === questions.length - 1 ? true : false}><ArrowForwardIosIcon /></button>
        </div>
    )
}

export default FlipCards