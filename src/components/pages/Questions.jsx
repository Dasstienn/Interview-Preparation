import QuestionComponent from "./QuestionComponent"
import classes from "./Questions.module.css"
import { useContext, useState } from "react"
import { questionsContext } from "../context/Context"
import { motion, AnimatePresence } from "framer-motion"

import SelectionMenu from "./SelectionMenu"


const Questions = () => {
    const { questions } = useContext(questionsContext)

    // Select dropdown states
    const [selectedCategories, setSelectedCategories] = useState('')
    const [selectedSubCategories, setSelectedSubCategories] = useState('')
    const [selectedCompanies, setSelectedCompanies] = useState('')

    const handleCategories = (val) => {
        setSelectedCategories(val)
    }

    const handleSubCategories = (val) => {
        setSelectedSubCategories(val)
    }

    const handleCompanies = (val) => {
        setSelectedCompanies(val)
    }


    // Rendering
    return (
        <div className={classes.container}>
            <SelectionMenu
                setCategories={handleCategories}
                setSubCategories={handleSubCategories}
                setCompanies={handleCompanies}
            />
            <motion.div layout className={classes.questions}>
                <AnimatePresence>
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
                </AnimatePresence>
            </motion.div>
        </div>
    )

}

export default Questions