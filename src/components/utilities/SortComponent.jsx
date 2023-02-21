import React from "react"
import Select from "react-select"
import _ from "lodash"
import { useContext } from "react"
import { questionsContext } from "../../store/questions-context"
import { useState } from "react"


const SortComponent = () => {
    const { questions, setQuestions } = useContext(questionsContext)
    const [selected, setSelected] = useState('featured')

    const options = [
        { value: 'featured', label: 'Featured' },
        { value: 'score-desc', label: 'Score: High to Low' },
        { value: 'score-asc', label: 'Score: Low to High' },
    ]

    const sort = (selected) => {
        switch (selected.value) {
            case 'featured':
                setQuestions(_.orderBy(questions, "views", "desc"));
                break;
            case 'score-desc':
                setQuestions(_.orderBy(questions, "score", "desc"));
                break;
            case 'score-asc':
                setQuestions(_.orderBy(questions, "score", "asc"));
                break;
        }
    }

    return (
        <div>
            <Select
                styles={{
                    placeholder: (baseStyles, state) => ({
                        ...baseStyles,
                        color: "black"
                    }),
                    control: (baseStyles, state) => ({
                        ...baseStyles,
                        cursor: "pointer",
                        width: "180px",
                        fontSize: "12px",
                        height: "18px",
                        backgroundColor: "#F0F2F2",
                        borderColor: "#D5D9D9",
                        borderRadius: "10px",
                        boxShadow: "0 2px 5px rgb(15 17 17 / 15%)"
                    }),
                    dropdownIndicator: (baseStyles, state) => ({
                        ...baseStyles,
                        color: "black"
                    }),
                    option: (baseStyles, state) => ({
                        ...baseStyles,
                        cursor: "pointer",
                        padding: "3px 10px",
                        fontSize: "15px",
                    }),
                }}
                options={options}
                defaultValue={"featured"}
                placeholder={`Sort by:`}
                onChange={sort} />
        </div>
    )
}

export default SortComponent