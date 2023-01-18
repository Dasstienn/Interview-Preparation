import classes from "./FlipCard.module.css"
import Card from "./card/Card"
import { CSSTransition } from 'react-transition-group'
import { useState } from "react"

const FlipCard = ({ question }) => {
    const [showFront, setShowFront] = useState(true)


    return (
        <div className={classes.flipcard}>
            <CSSTransition
                in={showFront}
                timeout={300}
                classNames="flip"
            >
                <Card
                    question={question}
                    onClick={() => {
                        setShowFront((prevState) => !prevState)
                    }}
                />
            </CSSTransition>
        </div>
    )
}

export default FlipCard