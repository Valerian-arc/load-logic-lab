import { useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

const STATES: Array<{ name: string; abbr: string }> = [
  { name: "Alabama", abbr: "AL" },
  { name: "Alaska", abbr: "AK" },
  { name: "Arizona", abbr: "AZ" },
  { name: "Arkansas", abbr: "AR" },
  { name: "California", abbr: "CA" },
  { name: "Colorado", abbr: "CO" },
  { name: "Connecticut", abbr: "CT" },
  { name: "Delaware", abbr: "DE" },
  { name: "Florida", abbr: "FL" },
  { name: "Georgia", abbr: "GA" },
  { name: "Hawaii", abbr: "HI" },
  { name: "Idaho", abbr: "ID" },
  { name: "Illinois", abbr: "IL" },
  { name: "Indiana", abbr: "IN" },
  { name: "Iowa", abbr: "IA" },
  { name: "Kansas", abbr: "KS" },
  { name: "Kentucky", abbr: "KY" },
  { name: "Louisiana", abbr: "LA" },
  { name: "Maine", abbr: "ME" },
  { name: "Maryland", abbr: "MD" },
  { name: "Massachusetts", abbr: "MA" },
  { name: "Michigan", abbr: "MI" },
  { name: "Minnesota", abbr: "MN" },
  { name: "Mississippi", abbr: "MS" },
  { name: "Missouri", abbr: "MO" },
  { name: "Montana", abbr: "MT" },
  { name: "Nebraska", abbr: "NE" },
  { name: "Nevada", abbr: "NV" },
  { name: "New Hampshire", abbr: "NH" },
  { name: "New Jersey", abbr: "NJ" },
  { name: "New Mexico", abbr: "NM" },
  { name: "New York", abbr: "NY" },
  { name: "North Carolina", abbr: "NC" },
  { name: "North Dakota", abbr: "ND" },
  { name: "Ohio", abbr: "OH" },
  { name: "Oklahoma", abbr: "OK" },
  { name: "Oregon", abbr: "OR" },
  { name: "Pennsylvania", abbr: "PA" },
  { name: "Rhode Island", abbr: "RI" },
  { name: "South Carolina", abbr: "SC" },
  { name: "South Dakota", abbr: "SD" },
  { name: "Tennessee", abbr: "TN" },
  { name: "Texas", abbr: "TX" },
  { name: "Utah", abbr: "UT" },
  { name: "Vermont", abbr: "VT" },
  { name: "Virginia", abbr: "VA" },
  { name: "Washington", abbr: "WA" },
  { name: "West Virginia", abbr: "WV" },
  { name: "Wisconsin", abbr: "WI" },
  { name: "Wyoming", abbr: "WY" },
];

function randomIndex(max: number) {
  return Math.floor(Math.random() * max);
}

export default function StateAbbrevQuiz() {
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [answer, setAnswer] = useState("");
  const [currentIdx, setCurrentIdx] = useState(() => randomIndex(STATES.length));

  const current = useMemo(() => STATES[currentIdx], [currentIdx]);

  const submit = () => {
    const correct = current.abbr.toLowerCase() === answer.trim().toLowerCase();
    if (correct) {
      setScore((s) => s + 1);
      toast({ title: "Correct!", description: `${current.name} → ${current.abbr}` });
    } else {
      toast({ title: "Not quite", description: `It's ${current.abbr} for ${current.name}`, variant: "destructive" as any });
    }
    setRound((r) => r + 1);
    setAnswer("");
    setCurrentIdx(randomIndex(STATES.length));
  };

  return (
    <Card className="shadow-[var(--shadow-elevated)]">
      <CardHeader>
        <CardTitle>State Abbreviation Quiz</CardTitle>
        <CardDescription>Round {round} • Score {score}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">What is the USPS abbreviation for:</p>
            <p className="mt-1 text-2xl font-semibold">{current.name}</p>
          </div>
          <div className="flex items-end gap-2">
            <div className="flex-1 space-y-2">
              <Label htmlFor="abbr">Your answer</Label>
              <Input id="abbr" placeholder="e.g. CA" value={answer} onChange={(e) => setAnswer(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') submit(); }} />
            </div>
            <Button variant="hero" onClick={submit}>Submit</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
