import { IoIosNotifications } from "react-icons/io";

const haveNotifications = true;

const Notifications = () => {
    return (
        <div className="navbar-icon">
            <div className="relative">
                {
                    haveNotifications ?
                        <div className="top-0.5 right-0.5 absolute bg-red-600 rounded-full w-2 aspect-square" />
                        : null
                }
                <IoIosNotifications/>
            </div>
        </div>
    )
}

export default Notifications