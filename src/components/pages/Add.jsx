import * as React from 'react';
import { useState, useContext } from "react";
import axios from "axios";
import { questionsContext } from "../../store/questions-context"

import classes from './Add.module.css'

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';



function Add() {
    const { questions, setQuestions } = useContext(questionsContext)

    const defaultToDo = {
        question: "",
        answer: "",
        category: "",
        subCategory: "",
        company: "",
        userId: ""
    }

    const [item, setItem] = useState(defaultToDo)
    const [questionError, setQuestionError] = useState("")
    const [answerError, setAnswerError] = useState("")
    const [categoryError, setCategoryError] = useState("")
    const [subCategoryError, setSubCategoryError] = useState("")
    const [companyError, setCompanyError] = useState("")

    const [category, setCategory] = useState('');
    const [otherCategory, setOtherCategory] = useState(false)
    const categories = questions.reduce((acc, val) => {
        if (!acc[val.category]) acc[val.category] = 1
        return acc
    }, {})
    categories["Other"] = 1

    const [subCategory, setSubCategory] = useState('');
    const subCategories = questions.reduce((acc, val) => {
        if (!acc[val.subCategory] && val.category === category) acc[val.subCategory] = 1
        return acc
    }, {})
    subCategories["Other"] = 1

    const [company, setCompany] = useState('');
    const companies = questions.reduce((acc, val) => {
        if (!acc[val.company]) acc[val.company] = 1
        return acc
    }, {})
    companies["Other"] = 1


    const handleCategoryChange = (event) => {
        const value = event.target.value
        if (value === "Other") {
            setOtherCategory(true)
            setCategory("")
        } else {
            setOtherCategory(false)
            setCategory("")
            setCategory(value);
            setItem({ ...item, category: value })
        }
    };

    const handleSubCategoryChange = (event) => {
        setSubCategory(event.target.value);
        setItem({ ...item, subCategory: event.target.value })
    };

    const handleCompanyChange = (event) => {
        setCompany(event.target.value);
        setItem({ ...item, company: event.target.value })
    };


    const addQuestion = async () => {
        await axios.post("https://interview-preparation-aa76e-default-rtdb.firebaseio.com/data.json", {
            author: localStorage.getItem("email"),
            question: item.question,
            answer: item.answer,
            answers: { null: 1 },
            category: item.category,
            subCategory: item.subCategory,
            company: item.company,
            userId: localStorage.getItem("id"),
            upvotes: { null: 1 },
            downvotes: { null: 1 },
            score: 0,
            views: 0
        },
            {
                headers: { 'Content-Type': 'application/json' }
            }
        )
    }

    const onSubmit = (event) => {
        event.preventDefault()
        !item.question ? setQuestionError("Please enter your question") : setQuestionError("")
        !item.answer ? setAnswerError("Please enter your answer") : setAnswerError("")
        !item.category ? setCategoryError("Please enter your category") : setCategoryError("")
        !item.subCategory ? setSubCategoryError("Please enter your subCategory") : setSubCategoryError("")
        !item.company ? setCompanyError("Please enter your company") : setCompanyError("")
        if (item.question && item.answer && item.category && item.subCategory && item.company) {
            addQuestion()
            setItem(defaultToDo)
            setQuestionError("")
            setAnswerError("")
            setCategoryError("")
            setSubCategoryError("")
            setCompanyError("")
        }
    }

    return (
        <Box
            className={classes.box}
            component="form"
            noValidate
            autoComplete="off"
        >
            <h3>Please enter your interview question and response to that question:</h3>
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
                error={!!questionError}
                helperText={questionError}
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
                error={!!answerError}
                helperText={answerError}
            />

            <div className={classes["select-container"]}>
                <FormControl
                    className={classes.select}
                    required
                    helperText={categoryError}
                    error={!!categoryError}
                >
                    <InputLabel id="demo-simple-select-label" >Category</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={item.category}
                        label="Category"
                        onChange={handleCategoryChange}
                    >
                        {Object.keys(categories).map(el => <MenuItem value={el}>{el}</MenuItem>)}
                    </Select>
                </FormControl>
                {otherCategory && (
                    <div>
                        <input type="text" placeholder='Please enter category' value={category} onChange={(e) => setCategory(e.target.value)} />
                    </div>
                )}
                <FormControl
                    className={classes.select}
                    required
                    helperText={subCategoryError}
                    error={!!subCategoryError}
                >
                    <InputLabel id="demo-simple-select-label">Sub-category</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={item.subCategory}
                        label="Sub-category"
                        disabled={!category}
                        onChange={handleSubCategoryChange}
                    >
                        {Object.keys(subCategories).map(el => <MenuItem value={el}>{el}</MenuItem>)}
                    </Select>
                </FormControl>
                <FormControl
                    className={classes.select}
                    required
                    helperText={companyError}
                    error={!!companyError}
                >
                    <InputLabel id="demo-simple-select-label">Company</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={item.company}
                        label="Company"
                        onChange={handleCompanyChange}
                    >
                        {Object.keys(companies).map(el => <MenuItem value={el}>{el}</MenuItem>)}
                    </Select>
                </FormControl>
            </div>
            <button className={classes["submit-btn"]} onClick={onSubmit}>Submit</button>
        </Box>
    )
}

export default Add