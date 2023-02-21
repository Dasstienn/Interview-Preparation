import { useContext, useState } from 'react'
import { questionsContext } from '../../store/questions-context';

import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';



const Search = ({ getQuestion }) => {
    const { questions } = useContext(questionsContext)

    const [searchedVal, setSearchedVal] = useState(null)

    const searchHandler = (event, value) => {
        setSearchedVal(value)
        getQuestion(value)
    }


    return (
        <Autocomplete
            id="highlights-demo"
            sx={{ width: 700 }}
            options={questions}
            getOptionLabel={(option) => option.question}
            renderInput={(params) => (
                <TextField {...params} label="Search" margin="normal" />
            )}
            // value={searchedVal}
            onChange={searchHandler}
            renderOption={(props, option, { inputValue }) => {
                const matches = match(option.question, inputValue, { insideWords: true });
                const parts = parse(option.question, matches);

                return (
                    <li {...props}>
                        <div>
                            {parts.map((part, index) => (
                                <div
                                    key={index}
                                    style={{
                                        fontWeight: part.highlight ? 700 : 400,
                                    }}
                                >
                                    {part.text}
                                </div>
                            ))
                            }
                        </div >
                    </li >
                );
            }}
        />
    );

}

export default Search