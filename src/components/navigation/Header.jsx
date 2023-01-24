import { Link, BrowserRouter as Router, Switch } from 'react-router-dom';
import classes from "./Header.module.css"

function Header() {
    return (
        <div className={classes.main}>
            <p className={classes.title}>Learned</p>
            <div className={classes.menu}>
                <p><Link className={classes.link} to="/input">Contribute</Link></p>
                <p><Link className={classes.link} to="/flipcards">Flipcards</Link></p>
                <p><Link className={classes.link} to="/questions">Questions</Link></p>
            </div>
        </div>
    )
}

export default Header