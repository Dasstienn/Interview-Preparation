import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/navigation/Header';
import Home from './components/pages/Home';
import Input from './components/pages/Input';
import Questions from './components/pages/Questions';
import FlipCards from './components/pages/FlipCards';


function App() {

  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/input" component={Input} />
          <Route path="/flipcards" component={FlipCards} />
          <Route path="/questions" component={Questions} />
        </Switch>
      </Router >
    </div >
  );
}

export default App;
