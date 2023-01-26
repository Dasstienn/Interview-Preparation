import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

import { useContext, useState } from "react"
import { questionsContext } from '../../context/Context';



const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};


const SubCategories = ({ categories, setSubCategories }) => {
    const { questions } = useContext(questionsContext)

    const subCategories = questions.reduce((acc, val) => {
        if(categories.length > 0) {
            if (!acc[val.subCategory] && categories.includes(val.category)) acc[val.subCategory] = 1
        } else {
            if (!acc[val.subCategory]) acc[val.subCategory] = 1
        }
        return acc
    }, {})

    const [selected, setSelected] = useState([]);

    const handleSubCategoryChange = (event) => {
        const { target: { value }, } = event;
        setSelected(typeof value === 'string' ? value.split(',') : value,);
        setSubCategories(typeof value === 'string' ? value.split(',') : value,)
    };


    return (
        <div>
            <FormControl sx={{ m: 1, width: 200, bgcolor: "white", borderRadius: 2}}  size='small'>
                <InputLabel id="demo-multiple-checkbox-label">Sub-category</InputLabel>
                <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={selected}
                    onChange={handleSubCategoryChange}
                    input={<OutlinedInput label="Sub-category" />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                >
                    {Object.keys(subCategories).map((el) => (
                            <MenuItem key={el} value={el}>
                                <Checkbox sx={{p:0.5}} checked={selected.indexOf(el) > -1} />
                                <ListItemText primary={el} />
                            </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}

export default SubCategories