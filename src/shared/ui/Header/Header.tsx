import User from './User';
import Notifications from './Notifications';
import PageTitle from './PageTitle';
import Search from './Search';


const Header = () => {
  return (
    <header className="flex justify-between items-center gap-4 bg-background p-2 border">
      <div className='flex items-center gap-8'>
        <PageTitle />
      </div>
      {/* right side*/}
      <div className="flex items-center gap-0 md:gap-3">
        <Search />
        <Notifications />
        <User />
      </div>
    </header>
  )
}

export default Header;