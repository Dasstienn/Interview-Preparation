import classes from "./FlipCard.module.css"
import Card from "./card/Card"
import { CSSTransition } from 'react-transition-group'
import { useState } from "react"

const FlipCard = ({ question, showFront, setFlip }) => {

    const handleClick = () => {
        setFlip()
    }

    return (
        <div className={classes.flipcard}>
            <CSSTransition
                in={showFront}
                timeout={300}
                classNames="flip"
            >
                <Card
                    question={question}
                    onClick={handleClick}
                />
            </CSSTransition>
        </div>
    )
}

export default FlipCard