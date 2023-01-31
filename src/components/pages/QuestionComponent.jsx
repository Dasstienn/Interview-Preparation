import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { motion } from "framer-motion"
import { Link } from 'react-router-dom';
import classes from './QuestionComponent.module.css'
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import axios from 'axios';
import { useState } from 'react';


export default function QuestionComponent(props) {
    const { question, answer, category, company, id, upvotes, downvotes} = props.question
    const userId = localStorage.getItem("id")

    const [expanded, setExpanded] = useState(false);

    const [thumbUp, setThumbUp] = useState(Object.hasOwn(upvotes, userId) && userId);
    const [thumbDown, setThumbDown] = useState(Object.hasOwn(downvotes, userId) && userId);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleThumbUp = () => {
        if (!thumbUp) {
            setThumbUp(true)
            updateQuestionScoreUp()
            if (thumbDown) {
                removeQuestionScoreDown()
                setThumbDown(false)
            }
            updateScore()
        }
    }

    const handleThumbDown = () => {
        if (!thumbDown) {
            setThumbDown(true)
            updateQuestionScoreDown()
            if (thumbUp) {
                removeQuestionScoreUp()
                setThumbUp(false)
            }
            updateScore()
        }
    }

    const updateQuestionScoreUp = async () => {
        if (userId) {
            const obj = upvotes
            const added = userId
            obj[added] = 1
            await axios.patch(`https://interview-preparation-aa76e-default-rtdb.firebaseio.com/data/${props.dataId}.json`, {
                upvotes: obj
            })
        }
    }

    const updateQuestionScoreDown = async () => {
        if (userId) {
            const obj = downvotes
            const added = userId
            obj[added] = 1
            await axios.patch(`https://interview-preparation-aa76e-default-rtdb.firebaseio.com/data/${props.dataId}.json`, {
                downvotes: obj
            })
        }
    }

    const removeQuestionScoreUp = async () => {
        if (userId) {
            const obj = upvotes
            delete obj[userId]
            await axios.patch(`https://interview-preparation-aa76e-default-rtdb.firebaseio.com/data/${props.dataId}.json`, {
                upvotes: obj
            })
        }
    }

    const removeQuestionScoreDown = async () => {
        if (userId) {
            const obj = downvotes
            delete obj[userId]
            await axios.patch(`https://interview-preparation-aa76e-default-rtdb.firebaseio.com/data/${props.dataId}.json`, {
                downvotes: obj
            })
        }
    }

    const updateScore = async () => {
        if (userId) {
            const newScore = Math.max(0, Object.keys(upvotes).length - Object.keys(downvotes).length)
            await axios.patch(`https://interview-preparation-aa76e-default-rtdb.firebaseio.com/data/${props.dataId}.json`, {
                score: newScore
            })
        }
    }

    return (
        <motion.div
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            layout
        >
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} sx={{ border: "1px solid gray" }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Typography sx={{ width: '15%', flexShrink: 0, color: 'text.secondary', fontWeight: "600" }}>
                        {category}
                    </Typography>
                    <Typography sx={{ color: 'text.primary', fontWeight: "600" }}>{question}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography sx={{ margin: "20px 0 40px 0" }}>
                        {answer}
                    </Typography>
                    <p style={{ fontWeight: "500" }}>Company asked: <span style={{ fontStyle: "italic", color: "gray", fontWeight: "500" }}>{company}</span></p>
                    <div className={classes.footing}>
                        <Link to={`/questions/${id}`}>Details</Link>
                        <div className={classes.thumbs}>
                            <h1 onClick={handleThumbUp}>
                                {thumbUp ? <ThumbUpIcon /> : <ThumbUpAltOutlinedIcon />}
                            </h1>
                            <h1 onClick={handleThumbDown}>
                                {thumbDown ? <ThumbDownIcon /> : <ThumbDownAltOutlinedIcon />}
                            </h1>
                        </div>
                    </div>
                </AccordionDetails>
            </Accordion>
        </motion.div>
    );
}