import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import classes from "./Navbar.module.css"

const Navbar = () => {
    const authCtx = useContext(AuthContext)
    const isLoggedIn = authCtx.isLoggedIn

    const logoutHandler = () => {
        authCtx.logout()
    }

    return (
        <div className={classes.main}>
            <NavLink className={classes.title} to="/" end>LearnD</NavLink>
            <div className={classes.menu}>
                <NavLink to="/questions" className={({ isActive }) => isActive ? classes.active : classes.link}>Questions</NavLink>
                <NavLink to="/flipcards" className={({ isActive }) => isActive ? classes.active : classes.link}>Flipcards</NavLink>
                <NavLink to="/input" className={({ isActive }) => isActive ? classes.active : classes.link}>Contribute</NavLink>
            </div>
            {!isLoggedIn && <Link className={classes.signup} to="/signup">Login</Link>}
            {isLoggedIn && <button className={classes.signup} onClick={logoutHandler}>Logout</button>}
        </div>
    )
}

export default Navbar