import { useState} from "react";
import * as React from 'react';
import classes from './Input.module.css'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import axios from "axios";


function Input({ questions, setSubmit }) {
    const defaultToDo = {
        // id: questions[questions.length - 1].id + 1,
        question: "",
        answer: "",
        category: "",
        company: "",
    }

    const [item, setItem] = useState(defaultToDo)

    const addQuestion = async () => {
        await axios.post("https://interview-preparation-aa76e-default-rtdb.firebaseio.com/data.json", {
            id: item.id,
            question: item.question,
            answer: item.answer,
            category: item.category,
            company: item.company
        },
            {
                headers: { 'Content-Type': 'application/json' }
            }
        )
    }

    const onSubmit = (event) => {
        event.preventDefault()
        addQuestion()
        setItem(defaultToDo)
        setSubmit()
    }

    return (
        <Box
            className={classes.box}
            component="form"
            noValidate
            autoComplete="off"
        >
            <TextField
                className={classes["input-area"]}
                id="outlined-multiline-static"
                label="Question"
                multiline
                rows={4}
                placeholder="Enter your question"
                value={item.question}
                required
                onChange={(e) => setItem({ ...item, question: e.target.value })}
            />
            <TextField
                className={classes["input-area"]}
                id="outlined-multiline-static"
                label="Response"
                multiline
                rows={10}
                placeholder="Enter your response"
                value={item.answer}
                required
                onChange={(e) => setItem({ ...item, answer: e.target.value })}
            />
            <button className={classes["submit-btn"]} onClick={onSubmit}>Submit</button>
        </Box>
    )
}

export default Input