import { BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/navigation/Header';
import Input from './components/pages/Input';
import Questions from './components/pages/Questions';
import FlipCards from './components/pages/FlipCards';


function App() {

  return (
      <div className="App">
        <Router>
          <Header />
          <Switch>
            <Router path="/input">
              <Input />
            </Router>
            <Router path="/flipcards">
              <FlipCards />
            </Router>
            <Router path="/questions">
              <Questions />
            </Router>
          </Switch>
        </Router >
      </div >
  );
}

export default App;
