import GameList from '../GameList/GameList';
import Friends from '../Friends/Friends';
import GOTW from '../GOTW/GOTW';

const Dashboard = () => {
    return (
        <div>
            <h1>Gaming Dashboard</h1>
            <p>Welcome to your gaming dashboard!</p>
            <div className='dashboard-tiles'>
                <GOTW />
                <GameList />
                <Friends />
            </div>
        </div>
    )
}

export default Dashboard
