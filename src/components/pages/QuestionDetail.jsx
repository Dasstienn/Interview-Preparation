import { useParams, Link } from 'react-router-dom'


const QuestionDetail = () => {
    const params = useParams()

    return (
        <div>
            <p>{params.questionId}</p>
            <p><Link to=".." relative="path">Back</Link></p>
        </div>
    )
}

export default QuestionDetail