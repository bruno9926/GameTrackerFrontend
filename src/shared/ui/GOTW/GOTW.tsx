//import game from '@assets/silksong.webp';
//import game from '@assets/silksong2.webp';

const GOTW = () => {
  return (
    <section className="group relative mb-4 h-125 lg:h-155 overflow-hidden cursor-pointer">
      {/* Image */}
      <img
        src="https://images.igdb.com/igdb/image/upload/t_1080p/sc63a7.webp"
        alt="Game of the Week"
        className="w-full h-full object-bottom object-cover group-hover:scale-105 transition-transform animation-duration"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent" />
      {/* Content */}
      <div className="bottom-6 left-6 z-10 absolute flex flex-col gap-1 max-w-xl">
        <span className="font-medium text-brand text-sm">
          Game of the Week
        </span>
        <h2 className="font-semibold text-2xl md:text-3xl leading-tight">
          Hollow Knight: Silksong
        </h2>
        <div className="flex flex-wrap gap-2 mt-2">
          <span className="bg-brand border-brand text-accent-foreground badge">Played by 2 friends</span>
          <span className="border text-subtitle badge">Added by 10 players</span>
        </div>

      </div>
    </section>
  )
}

export default GOTW