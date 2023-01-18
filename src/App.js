import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Input from './components/Input';
import Questions from './components/Questions';
import FlipCards from './components/FlipCards';

function App() {
  const [questions, setQuestions] = useState([])
  const dataUrl = "https://interview-preparation-aa76e-default-rtdb.firebaseio.com/data.json"

  const fetchQuestions = async () => {
    const res = await (await axios.get(dataUrl)).data
    const loadedQs = []
    for (const key in res) {
      loadedQs.push(res[key])
    }
    setQuestions(loadedQs)
  }

  useEffect(() => {
    fetchQuestions()
  }, [])

  const onInputSubmit = () => {
    fetchQuestions()
  }

  return (
    <div className="App">
      <Input questions={questions} setSubmit={onInputSubmit} />
      <FlipCards questions={questions}/>
      <Questions questions={questions} />
    </div>
  );
}

export default App;
