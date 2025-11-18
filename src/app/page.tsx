import { CompetitionSchedule, HeroCarousel, OurRole } from "@/widgets/main";

export default function Home() {
    return (
        <div className="bg-kua-white flex items-center justify-center">
            <main className="flex w-full flex-col items-center justify-between gap-24 px-16 pb-24">
                <HeroCarousel />
                <OurRole />
                <CompetitionSchedule />
            </main>
        </div>
    );
}
