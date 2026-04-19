//import game from '@assets/silksong.webp';
import game from '@assets/silksong2.webp';


const GOTW = () => {
  return (
    <section className="group relative mb-4 h-125 lg:h-125 overflow-hidden cursor-pointer">
      {/* Image */}
      <img
        src={game}
        alt="Game of the Week"
        className="w-full h-full object-bottom object-cover group-hover:scale-105 transition-transform duration-300"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-bg via-transparent to-transparent" />
      {/* Content */}
      <div className="bottom-6 left-6 z-10 absolute flex flex-col gap-1 max-w-xl text-white">
        <span className="font-medium text-brand text-sm">
          Game of the Week
        </span>
        <h2 className="font-semibold text-2xl md:text-3xl leading-tight">
          Hollow Knight: Silksong
        </h2>
      </div>
    </section>
  )
}

export default GOTW