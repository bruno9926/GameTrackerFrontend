import { cva } from "class-variance-authority";
import useGameStats from "../../hooks/useGameStats";
import { Link } from "react-router";
import { userRoutes } from "@/app/routes/routes";

const Staticstics = () => {

    const {
        gamesFinished,
        gamesInProgress
    } = useGameStats();
    
    return (
        <div className="flex w-full overflow-x-auto gap-5 md:gap-10 p-2">
            <GamesFinished gamesFinished={gamesFinished} />
            <GamesInProgress gamesInProgress={gamesInProgress} />
        </div>
    );
}

const GamesFinished = ({ gamesFinished }: { gamesFinished: number }) => {
    return (
        <StaticsticCard variant="primary">
            <span className="text-2xl md:text-3xl">You have <span className="font-bold not-italic">finished {gamesFinished} games</span> this year!</span>
        </StaticsticCard>
    )
}

const GamesInProgress = ({ gamesInProgress }: { gamesInProgress: number }) => {
    return (
        <StaticsticCard variant="secondary">
            <span className="text-2xl md:text-3xl">You have <span className="font-bold not-italic"> {gamesInProgress} games in progress</span>!</span>
        </StaticsticCard>
    )
}

const StaticsticCard = ({ children, variant = 'primary' }: { children: React.ReactNode, variant?: 'primary' | 'secondary' }) => {
    const styles = cva('card w-45 md:w-60 md:p-6 border-0 text-accent-foreground shadow-lg italic shrink-0 hover:scale-105 transition-transform', {
        variants: {
            variant: {
                primary: 'bg-gradient-to-br from-primary to-[#290f0c]',
                secondary: 'bg-gradient-to-br from-secondary to-[#290f0c]',
            }
        },
        defaultVariants: {
            variant: 'primary',
        }
    });

    return (
        <Link className={styles({ variant })} to={userRoutes.GAMES}>
            {children}
        </Link>
    )
}

export default Staticstics;