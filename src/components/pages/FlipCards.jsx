import { useState, useContext, useMemo } from "react";
import { questionsContext } from "../../store/questions-context"
import { motion, AnimatePresence } from "framer-motion"

import "./FlipCards.module.css"
import classes from "./FlipCards.module.css"

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import FlipCard from "../flipcard/FlipCard";
import SelectionMenu from "./SelectionMenu";
import { useEffect } from "react";



const FlipCards = () => {
    const { questions } = useContext(questionsContext)


    const [view, setView] = useState("all")
    const [idx, setIdx] = useState(0)
    const [showFront, setShowFront] = useState(true)
    const [filtered, setFiltered] = useState(questions)


    // Select dropdown states
    const [selectedCategories, setSelectedCategories] = useState('')
    const [selectedSubCategories, setSelectedSubCategories] = useState('')
    const [selectedCompanies, setSelectedCompanies] = useState('')

    useEffect(() => {
        const filteredData = questions.filter(item => {
            if (
                (selectedCategories.includes(item.category) || !selectedCategories.length) &&
                (selectedSubCategories.includes(item.subCategory) || !selectedSubCategories.length) &&
                (selectedCompanies.includes(item.company) || !selectedCompanies.length)
            ) return item
        })
        setFiltered(filteredData)
    }, [selectedCategories, selectedSubCategories, selectedCompanies])


    const prevClick = () => {
        if (idx >= 1) {
            const num = idx - 1
            setIdx(num)
            setShowFront(true)
        }
    }

    const nextClick = () => {
        if (idx < filtered.length - 1) {
            const num = idx + 1
            setIdx(num)
            setShowFront(true)
        }
    }

    const handleCategories = (val) => {
        setSelectedCategories(val)
    }

    const handleSubCategories = (val) => {
        setSelectedSubCategories(val)
    }

    const handleCompanies = (val) => {
        setSelectedCompanies(val)
    }

    return (
        <div>
            <div className={classes.view}>
                <button className={view !== 'all' && classes["not-active"]} onClick={() => setView('all')}>All</button>
                <button className={view !== 'single' && classes["not-active"]} onClick={() => setView('single')}>Single</button>
            </div>
            <SelectionMenu
                setCategories={handleCategories}
                setSubCategories={handleSubCategories}
                setCompanies={handleCompanies}
            />
            {view === 'all' ? (
                <motion.div layout className={classes["cards-area"]}>
                    <AnimatePresence>
                        {questions.map(item => {
                            if (
                                (selectedCategories.includes(item.category) || !selectedCategories.length) &&
                                (selectedSubCategories.includes(item.subCategory) || !selectedSubCategories.length) &&
                                (selectedCompanies.includes(item.company) || !selectedCompanies.length)
                            ) {
                                return (
                                    <div className={classes.card}><FlipCard question={item} showFront={showFront} /></div>
                                )
                            }
                        })}
                    </AnimatePresence>
                </motion.div>
            ) : (
                <div className={classes.area}>
                    <button className={classes.btn} onClick={prevClick} disabled={idx === 0 ? true : false}><ArrowBackIosIcon /></button>
                    <FlipCard question={filtered[idx] ?? {}} showState={showFront} />
                    <button className={classes.btn} onClick={nextClick} disabled={idx === questions.length - 1 ? true : false}><ArrowForwardIosIcon /></button>
                </div>
            )}
        </div>
    )
}

export default FlipCards