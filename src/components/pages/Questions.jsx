import QuestionComponent from "./QuestionComponent"
import classes from "./Questions.module.css"
import { useContext, useState } from "react"
import { questionsContext } from "../context/Context"
import Categories from "./questions/Categories"
import SubCategories from "./questions/SubCategories"
import Companies from "./questions/Companies"

import Box from '@mui/material/Box';



const Questions = () => {
    const { questions } = useContext(questionsContext)


    // Categories selection
    const [category, setCategory] = useState('');
    const [selectedCategories, setSelectedCategories] = useState('')
    const categories = Object.keys(questions.reduce((acc, val) => {
        if (!acc[val.category]) acc[val.category] = 1
        return acc
    }, {}))

    const handleCategories = (val) => {
        val.length > 0 ? setSelectedCategories(val) : setSelectedCategories(categories)
    }


    // Sub-categories selection
    const [subCategory, setSubCategories] = useState('');
    const [selectedSubCategories, setSelectedSubCategories] = useState('')
    const subCategories = Object.keys(questions.reduce((acc, val) => {
        if (!acc[val.subCategory]) acc[val.subCategory] = 1
        return acc
    }, {}))

    const handleSubCategories = (val) => {
        val.length > 0 ? setSelectedSubCategories(val) : setSelectedSubCategories(subCategories)
    }


    // Companies selection
    const [company, setCompany] = useState('');
    const [selectedCompanies, setSelectedCompanies] = useState('')
    const companies = Object.keys(questions.reduce((acc, val) => {
        if (!acc[val.company]) acc[val.company] = 1
        return acc
    }, {}))

    const handleCompanies = (val) => {
        val.length > 0 ? setSelectedCompanies(val) : setSelectedCompanies(companies)
    }


    // Rendering
    return (
        <div className={classes.container}>
            <Box
                className={classes.box}
                component="form"
                noValidate
                autoComplete="off"
            >
                <div className={classes["select-container"]}>
                    <Categories setCategories={handleCategories} />
                    <SubCategories setSubCategories={handleSubCategories} categories={selectedCategories} />
                    <Companies setCompanies={handleCompanies}/>
                </div>
            </Box>
            {questions.map(item => {
                if (
                    (selectedCategories.includes(item.category) || !selectedCategories.length) &&
                    (selectedSubCategories.includes(item.subCategory) || !selectedSubCategories.length) &&
                    (selectedCompanies.includes(item.company) || !selectedCompanies.length)
                ) {
                    return (
                        <QuestionComponent key={item.id} question={item} />
                    )
                }
            })}
        </div>
    )

}

export default Questions