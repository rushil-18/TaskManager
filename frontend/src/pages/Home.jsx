import { Link } from "react-router-dom";
function Home(){
    return(
        <div className="page">
            <h1>Welcome to Task Manager!</h1>
            <p> Manage tasks - Track your progress</p>
            <Link to="/tasks"> Go to tasks </Link>
        </div>

    )
}
export default Home;