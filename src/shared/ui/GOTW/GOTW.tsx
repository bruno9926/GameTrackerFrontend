import useGOTW from "@features/games/hooks/useGOTW"
import { Skeleton } from "@shared/ui/chadcn/skeleton"
import ErrorMessage from "@shared/ui/Atoms/ErrorMessage/ErrorMessage"

const bannerClass = "relative mb-4 h-125 lg:h-155 overflow-hidden"

const GOTW = () => {

  const { gotw, loading, error, fetchGOTW } = useGOTW();

  if (loading) {
    return <Skeleton className={`${bannerClass} rounded-none`} />
  }

  if (error) {
    return (
      <section className={`${bannerClass} flex items-center justify-center bg-card border-b border-border`}>
        <ErrorMessage message={error} retryAction={fetchGOTW} />
      </section>
    )
  }

  if (!gotw) {
    return (
      <section className={`${bannerClass} flex flex-col items-center justify-center gap-2 bg-card border-b border-border`}>
        <span className="text-4xl opacity-40 grayscale">🏆</span>
        <p className="font-medium text-subtitle/60 text-sm">No Game of the Week yet</p>
      </section>
    )
  }

  return (
    <section className="group relative mb-4 h-125 lg:h-155 overflow-hidden cursor-pointer">
      {/* Image */}
      <img
        src={gotw.coverUrl || "https://images.igdb.com/igdb/image/upload/t_1080p/ar4sz.webp"}
        alt={gotw.name}
        className="w-full h-full object-center object-cover group-hover:scale-105 transition-transform animation-duration contrast-115"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent" />
      {/* Content */}
      <div className="bottom-6 left-6 z-10 absolute flex flex-col gap-1 max-w-xl">
        <span className="font-medium text-accent text-sm">
          Game of the Week
        </span>
        <h2 className="font-semibold text-2xl md:text-3xl leading-tight">
          {gotw.name}
        </h2>
        <div className="flex flex-wrap gap-2 mt-2">
          <span className="bg-accent border-accent text-accent-foreground badge">Played by {gotw.friendsPlaying} friends</span>
          <span className="border text-subtitle badge">Added by {gotw.usersPlaying} players</span>
        </div>

      </div>
    </section>
  )
}

export default GOTW