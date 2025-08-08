import StateAbbrevQuiz from "@/components/games/StateAbbrevQuiz";
import BolRateConChecker from "@/components/games/BolRateConChecker";
import WeightChecker from "@/components/tools/WeightChecker";
import DetentionLumperCalculator from "@/components/games/DetentionLumperCalculator";

export default function GamesHub() {
  return (
    <div className="min-h-screen bg-background">
      <header className="container py-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Games & Practice Hub</h1>
        <p className="mt-3 text-muted-foreground">Sharpen dispatch skills with quick, practical mini-games.</p>
      </header>
      <main className="container grid gap-10 pb-16">
        <section className="animate-enter">
          <BolRateConChecker />
        </section>
        <section className="animate-enter">
          <StateAbbrevQuiz />
        </section>
        <section className="animate-enter">
          <WeightChecker />
        </section>
        <section className="animate-enter">
          <DetentionLumperCalculator />
        </section>
      </main>
    </div>
  );
}
