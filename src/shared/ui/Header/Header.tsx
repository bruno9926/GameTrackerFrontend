import User from './User';
import Notifications from './Notifications';
import PageTitle from './PageTitle';


const Header = () => {
  return (
    <header className="flex justify-between items-center gap-4 p-2 border">
      <PageTitle />
      {/* right side*/}
      <div className="flex items-center gap-3">
        <Notifications />
        <User />
      </div>
    </header>
  )
}

export default Header;