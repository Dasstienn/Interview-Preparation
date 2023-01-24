import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


export default function QuestionComponent(props) {
    const { question, answer, category, company } = props.question
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <div>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} sx={{ border: "1px solid gray"}}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Typography sx={{ width: '15%', flexShrink: 0, color: 'text.secondary', fontWeight: "600" }}>
                        {category}
                    </Typography>
                    <Typography sx={{ color: 'text.primary', fontWeight: "600" }}>{question}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography sx={{ margin: "20px 0 40px 0" }}>
                        {answer}
                    </Typography>
                    <p style={{fontWeight: "500"}}>Company asked: <span style={{fontStyle: "italic", color: "gray", fontWeight: "500"}}>{company}</span></p>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}