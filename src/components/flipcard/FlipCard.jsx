import classes from "./FlipCard.module.css"
import Card from "./card/Card"
import { CSSTransition } from 'react-transition-group'
import { useState } from "react"
import { motion } from "framer-motion"

const FlipCard = ({ question }) => {
    const [showFront, setShowFront] = useState(true)

    const handleClick = () => {
        setShowFront((prevState) => !prevState)
    }

    return (
        <motion.div
            layout
            animate={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{duration: 0.3}}
            className={classes.flipcard}
        >
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
        </motion.div>
    )
}

export default FlipCard