import { Link } from 'react-router-dom';
import classes from "./Header.module.css"

function Header() {
    return (
        <div className={classes.main}>
            <Link className={classes.title} to="/">LearnD</Link>
            <div className={classes.menu}>
                <Link className={classes.link} to="/questions">Questions</Link>
                <Link className={classes.link} to="/flipcards">Flipcards</Link>
                <Link className={classes.link} to="/input">Contribute</Link>
            </div>
        </div>
    )
}

export default Header