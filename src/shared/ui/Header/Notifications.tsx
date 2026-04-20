import { IoIosNotifications } from "react-icons/io";

const haveNotifications = true;

const Notifications = () => {
    return (
        <div className="p-2 hover:bg-border active:bg-border rounded-full transition-colors cursor-pointer animation-duration">
            <div className="relative">
                {
                    haveNotifications ?
                        <div className="top-0.5 right-0.5 absolute bg-red-600 rounded-full w-2 aspect-square" />
                        : null
                }
                <IoIosNotifications className="text-subtitle text-2xl" />
            </div>
        </div>
    )
}

export default Notifications