import QuestionComponent from "./QuestionComponent"
import classes from "./Questions.module.css"
import { useContext, useState } from "react"
import { questionsContext } from "../../store/questions-context"
import { motion, AnimatePresence } from "framer-motion"
import { useNavigate } from "react-router-dom"

import SelectionMenu from "./SelectionMenu"


const Questions = () => {
    const { questions, questionsData } = useContext(questionsContext)
    const navigate = useNavigate()

    const toFlipcards = () => {
        navigate('/flipcards')
    }

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
            <div className={classes["to-flipcards"]} onClick={toFlipcards}>
                <p>Flipcards</p>
            </div>
            <SelectionMenu
                setCategories={handleCategories}
                setSubCategories={handleSubCategories}
                setCompanies={handleCompanies}
            />
            <motion.div layout className={classes.questions}>
                <AnimatePresence>
                    {Object.keys(questionsData).map(key => {
                        const item = questionsData[key]
                        if (
                            (selectedCategories.includes(item.category) || !selectedCategories.length) &&
                            (selectedSubCategories.includes(item.subCategory) || !selectedSubCategories.length) &&
                            (selectedCompanies.includes(item.company) || !selectedCompanies.length)
                        ) {
                            return (
                                <QuestionComponent key={item.id} question={item} dataId={key} />
                            )
                        }
                    })}
                </AnimatePresence>
            </motion.div>
        </div>
    )

}

export default Questions