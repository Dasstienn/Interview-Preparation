import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import RootLayout from './components/pages/RootLayout';
import Home from './components/pages/Home';
import Input from './components/pages/Input';
import Questions from './components/pages/Questions';
import FlipCards from './components/pages/FlipCards';
import QuestionDetail from './components/pages/QuestionDetail';
import AuthForm from './components/Auth/AuthForm';



function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: "input", element: <Input /> },
        { path: "flipcards", element: <FlipCards /> },
        { path: "questions", element: <Questions /> },
        { path: "questions/:questionId", element: <QuestionDetail /> },
        { path: "signup", element: <AuthForm /> }
      ]
    },
  ])

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div >
  );
}

export default App;
