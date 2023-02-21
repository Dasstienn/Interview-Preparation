import * as React from 'react';
import { useState, useContext } from "react";
import axios from "axios";
import { questionsContext } from "../../store/questions-context"
import Search from '../utilities/SearchComponent';
import Add from './Add';

import classes from './Input.module.css'

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const Input = () => {
    const [section, setSection] = useState('search')

    const [searchedVal, setSearchedVal] = useState(null)
    const [newAnswer, setNewAnswer] = useState('')

    const userEmail = localStorage.getItem("email")

    const getQuestion = (val) => {
        setSearchedVal(val)
    }

    const responseAddHandler = async () => {
        if (userEmail && newAnswer) {
            const { answers, id } = searchedVal
            const obj = answers
            const added = userEmail.slice(0, userEmail.indexOf("@"))
            obj[added] = newAnswer
            await axios.patch(`https://interview-preparation-aa76e-default-rtdb.firebaseio.com/data/${id}.json`, {
                answers: obj
            })
        }
    }

    return (
        <div className={classes.main}>
            <div className={classes['section-selection']}>
                <div className={classes['section-item']} onClick={() => section !== "search" && setSection('search')}>Search</div>
                <div className={classes['section-item']} onClick={() => section !== "add" && setSection('add')}>Add Question</div>
            </div>
            {section === "search" && <div className={classes.search}>
                <Search getQuestion={getQuestion} />
                {searchedVal && (
                    <div className={classes['search-result']}>
                        <h1>{searchedVal.question}</h1>
                        <TextField
                            sx={{ width: 700 }}
                            className={classes["input-area"]}
                            id="outlined-multiline-static"
                            label="Response"
                            multiline
                            rows={10}
                            placeholder="Enter your response"
                            value={newAnswer}
                            required
                            onChange={(e) => setNewAnswer(e.target.value)}
                        />
                        <button onClick={responseAddHandler}>Add Response</button>
                    </div>
                )}
            </div>
            }
            {section === "add" && <Add />}
        </div>
    )
}

export default Input