import classes from "./Home.module.css"
import { Link } from "react-router-dom"


const Home = () => {
    return (
        <div>
            <div className={classes.landing}>
                <div className={classes["main-img"]}></div>
                <p className={classes.title}>Land Your Dream Job</p>
                <p className={classes.text}>
                    Join over <span>25 million job seekers</span> using LearnD's practical flashcards, practice techincal interview questions and expert answers to improve your chances of acing interviews and reach your goal of getting hired.
                </p>
                <button className={classes.btn}>Get Started</button>
            </div>
            <div className={classes["first-part"]}>
                <p className={classes["section-title"]}>90% of job seekers who use LearnD report receiving job offers.</p>
                <div className={classes["section-flashcards"]}>
                    <div className={classes.info}>
                        <p className={classes["info-title"]}>Memorize faster for free</p>
                        <p className={classes["info-text"]}>Research shows that testing yourself with flashcards is more effective than rereading your notes. From technical questions to behavioral, LearnD is used by job seekers in over 100 different topics.</p>
                        <Link to="/flipcards"><button className={classes.btn}>Try Flashcards for free</button></Link>
                    </div>
                    <img src="https://cdn.dribbble.com/users/26938/screenshots/1703104/duolingo-flashcards.gif" alt="flashcards-demo" />
                </div>
            </div>
        </div>
    )
}

export default Home