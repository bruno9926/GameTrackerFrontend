import clsx from 'clsx';
import type { Friend } from '@features/user/model/Friend';
import { BsJoystick } from "react-icons/bs";


type FriendItemProps = {} & Omit<Friend, 'id'>;

// const gameImages: Record<string, string> = {
//     "Hollow Knight: Silksong": "/games/hollow-knight-silksong.jpg",
//     "Final Fantasy 7 Rebirth": "/games/final-fantasy-7-rebirth.jpg",
//     "God of War Ragnarök": "/games/god-of-war-ragnarok.jpg",
//     "The Legend of Zelda: Tears of the Kingdom": "/games/zelda-tears-of-the-kingdom.jpg",
//     "Doom Eternal": "/games/doom-eternal.jpg",
//     "The Legend of Zelda: Ocarina of Time": "/games/zelda-ocarina.jpg",
//     "League of Legends": "/games/lol.jpg",
//     "Bioshock": "/games/bioshock.jpg",
// };

const FriendItem = ({ name, avatar }: FriendItemProps) => {
    return (
        <div className="flex justify-between items-center p-2 cursor-pointer">
            <div className="flex items-center gap-4">
                <div className='relative'>
                    <div className="rounded-xl w-12 aspect-square overflow-hidden">
                        {avatar ? <img className="w-full h-full object-cover" src={avatar} alt={`${name}'s avatar`} /> : name.charAt(0).toUpperCase()}
                    </div>
                    <span className={"block right-0 -bottom-1 absolute bg-green-500 rounded-2xl w-3.5 aspect-square"} />
                </div>
                <div className='flex flex-col'>
                    <span className="text-lg">{name}</span>
                    <div className='flex gap-2 text-subtitle'>
                        <BsJoystick />
                        <span className='text-sm'>Playing League of Legends</span>
                    </div>
                </div>

            </div>
            {/*
            <div className={styles['friends-games']}>
                <span>Playing with you</span>
                <div className={styles['friends-games-list']}>
                    {games.map((game, index) => (
                        <div key={index} className={styles['friends-game']} title={game}>
                            <img src={gameImages[game]} alt={game} />
                        </div>
                    ))}
                </div>
            </div>
            */}
        </div>
    )
}

export default FriendItem