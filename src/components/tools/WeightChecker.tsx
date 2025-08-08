import { useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

const LIMITS = {
  steer: 12999,
  driveWithApu: 34500,
  driveNoApu: 34000,
  trailer: 34100,
};

export default function WeightChecker() {
  const [steer, setSteer] = useState<string>("");
  const [drive, setDrive] = useState<string>("");
  const [trailer, setTrailer] = useState<string>("");
  const [apu, setApu] = useState<boolean>(true);

  const parsed = useMemo(() => ({
    steer: Number(steer) || 0,
    drive: Number(drive) || 0,
    trailer: Number(trailer) || 0,
  }), [steer, drive, trailer]);

  const results = useMemo(() => {
    const driveLimit = apu ? LIMITS.driveWithApu : LIMITS.driveNoApu;
    return {
      steer: {
        legal: parsed.steer <= LIMITS.steer,
        overBy: Math.max(0, parsed.steer - LIMITS.steer),
        limit: LIMITS.steer,
      },
      drive: {
        legal: parsed.drive <= driveLimit,
        overBy: Math.max(0, parsed.drive - driveLimit),
        limit: driveLimit,
      },
      trailer: {
        legal: parsed.trailer <= LIMITS.trailer,
        overBy: Math.max(0, parsed.trailer - LIMITS.trailer),
        limit: LIMITS.trailer,
      },
    };
  }, [parsed, apu]);

  const onQuickCheck = () => {
    const anyOver = !results.steer.legal || !results.drive.legal || !results.trailer.legal;
    if (anyOver) {
      toast({
        title: "Over legal limits",
        description: "Adjust axle weights to meet legal limits.",
        variant: "destructive" as any,
      });
    } else {
      toast({
        title: "All good!",
        description: "Weights are within legal limits.",
      });
    }
  };

  return (
    <Card className="shadow-[var(--shadow-elevated)]">
      <CardHeader>
        <CardTitle>Axle Weight Checker</CardTitle>
        <CardDescription>Uses legal limits: Steer 12,999 • Drive {apu ? "34,500 (APU)" : "34,000"} • Trailer 34,100</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="steer">Steer (lb)</Label>
            <Input id="steer" type="number" inputMode="numeric" placeholder="e.g. 12250" value={steer} onChange={(e) => setSteer(e.target.value)} />
            <StatusBadge legal={results.steer.legal} overBy={results.steer.overBy} limit={results.steer.limit} />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="drive">Drive (lb)</Label>
              <label className="inline-flex items-center gap-2 text-sm text-muted-foreground select-none">
                <input aria-label="APU installed" className="sr-only" type="checkbox" checked={apu} onChange={(e) => setApu(e.target.checked)} />
                <span className="relative inline-flex h-5 w-9 items-center rounded-full bg-input">
                  <span className={`absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-foreground transition-transform ${apu ? "translate-x-4" : ""}`} />
                </span>
                APU
              </label>
            </div>
            <Input id="drive" type="number" inputMode="numeric" placeholder="e.g. 34350" value={drive} onChange={(e) => setDrive(e.target.value)} />
            <StatusBadge legal={results.drive.legal} overBy={results.drive.overBy} limit={results.drive.limit} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="trailer">Trailer (lb)</Label>
            <Input id="trailer" type="number" inputMode="numeric" placeholder="e.g. 34000" value={trailer} onChange={(e) => setTrailer(e.target.value)} />
            <StatusBadge legal={results.trailer.legal} overBy={results.trailer.overBy} limit={results.trailer.limit} />
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button variant="hero" onClick={onQuickCheck}>Quick Check</Button>
          <Button variant="outline" onClick={() => { setSteer(""); setDrive(""); setTrailer(""); }}>Reset</Button>
        </div>
      </CardContent>
    </Card>
  );
}

function StatusBadge({ legal, overBy, limit }: { legal: boolean; overBy: number; limit: number }) {
  return (
    <div className={`text-sm px-3 py-2 rounded-md border ${legal ? "bg-secondary text-secondary-foreground" : "bg-destructive text-destructive-foreground"}`}>
      {legal ? "Legal" : `Over by ${overBy.toLocaleString()} lb`} • Limit {limit.toLocaleString()} lb
    </div>
  );
}
