import FlipCard from "./flipcard/FlipCard";
import { useState } from "react";
import classes from "./FlipCards.module.css"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


const FlipCards = ({ questions }) => {
    const [idx, setIdx] = useState(0)

    const prevClick = () => {
        if (idx >= 1) {
            const num = idx - 1
            setIdx(num)
        }
    }

    const nextClick = () => {
        if (idx < questions.length - 1) {
            const num = idx + 1
            setIdx(num)
        }
    }


    return (
        <div className={classes.area}>
            <button className={classes.btn} onClick={prevClick} disabled={idx === 0 ? true : false}><ArrowBackIosIcon /></button>
            <FlipCard question={questions[idx]} />
            <button className={classes.btn} onClick={nextClick} disabled={idx === questions.length - 1 ? true : false}><ArrowForwardIosIcon /></button>
        </div>
    )
}

export default FlipCards