import WeightChecker from "@/components/tools/WeightChecker";
import StateAbbrevQuiz from "@/components/games/StateAbbrevQuiz";
import BolRateConChecker from "@/components/games/BolRateConChecker";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: "var(--gradient-hero)" }}
        />
        <div className="container py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Load Mastery Quest — Trucking Tools & Games</h1>
          <p className="mt-4 text-lg text-muted-foreground">Fixing weights, nailing paperwork, and leveling up dispatch skills.</p>
          <div className="mt-6 flex justify-center gap-3">
            <a href="#checker"><Button variant="hero">Check Weights</Button></a>
            <a href="#bol"><Button variant="outline">BOL vs Rate Con</Button></a>
            <Link to="/games"><Button variant="secondary">Games Hub</Button></Link>
          </div>
        </div>
      </header>

      <main className="container space-y-12 pb-16">
        <section id="checker" aria-label="Axle Weight Checker">
          <h2 className="sr-only">Axle Weight Checker</h2>
          <WeightChecker />
        </section>

        <section id="quiz" aria-label="State Abbreviation Quiz">
          <h2 className="sr-only">State Abbreviation Quiz</h2>
          <StateAbbrevQuiz />
        </section>

        <section id="bol" aria-label="BOL vs Rate Con Checker">
          <h2 className="sr-only">BOL vs Rate Con Checker</h2>
          <BolRateConChecker />
        </section>

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Load Mastery Quest",
          description: "Trucking tools and minigames: axle weight checker, state quiz, BOL vs Rate Con checker.",
          applicationCategory: "BusinessApplication",
        }) }} />
      </main>
    </div>
  );
};

export default Index;
