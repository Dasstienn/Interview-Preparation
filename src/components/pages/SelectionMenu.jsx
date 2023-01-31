import classes from "./SelectionMenu.module.css"
import { useContext, useState } from "react"
import { questionsContext } from "../../store/questions-context"

import Categories from "./questions/Categories"
import SubCategories from "./questions/SubCategories"
import Companies from "./questions/Companies"

import Box from '@mui/material/Box';


const SelectionMenu = ({ setCategories, setSubCategories, setCompanies }) => {
    const { questions } = useContext(questionsContext)

    // Select dropdown states
    const [selectedCategories, setSelectedCategories] = useState('')
    const [selectedSubCategories, setSelectedSubCategories] = useState('')
    const [selectedCompanies, setSelectedCompanies] = useState('')


    // Categories selection
    const categories = Object.keys(questions.reduce((acc, val) => {
        if (!acc[val.category]) acc[val.category] = 1
        return acc
    }, {}))

    const handleCategories = (val) => {
        val.length > 0 ? setSelectedCategories(val) : setSelectedCategories(categories)
        val.length > 0 ? setCategories(val) : setCategories(categories)
    }


    // Sub-categories selection
    const subCategories = Object.keys(questions.reduce((acc, val) => {
        if (!acc[val.subCategory]) acc[val.subCategory] = 1
        return acc
    }, {}))

    const handleSubCategories = (val) => {
        val.length > 0 ? setSelectedSubCategories(val) : setSelectedSubCategories(subCategories)
        val.length > 0 ? setSubCategories(val) : setSubCategories(subCategories)
    }


    // Companies selection
    const companies = Object.keys(questions.reduce((acc, val) => {
        if (!acc[val.company]) acc[val.company] = 1
        return acc
    }, {}))

    const handleCompanies = (val) => {
        val.length > 0 ? setSelectedCompanies(val) : setSelectedCompanies(companies)
        val.length > 0 ? setCompanies(val) : setCompanies(companies)
    }


    // Rendering
    return (
        <Box
            className={classes.box}
            component="form"
            noValidate
            autoComplete="off"
        >
            <div className={classes["select-container"]}>
                <Categories setCategories={handleCategories} />
                <SubCategories setSubCategories={handleSubCategories} categories={selectedCategories} />
                <Companies setCompanies={handleCompanies} />
            </div>
        </Box>
    )
}

export default SelectionMenu