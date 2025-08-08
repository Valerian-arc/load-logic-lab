import { useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

function diffHours(start: string, end: string) {
  const a = new Date(start).getTime();
  const b = new Date(end).getTime();
  if (isNaN(a) || isNaN(b) || b <= a) return 0;
  return (b - a) / 36e5; // ms to hours
}

export default function DetentionLumperCalculator() {
  const now = useMemo(() => new Date().toISOString().slice(0, 16), []);
  const [checkIn, setCheckIn] = useState<string>(now);
  const [checkOut, setCheckOut] = useState<string>(now);
  const [freeHours, setFreeHours] = useState<string>("2");
  const [rate, setRate] = useState<string>("75");
  const [lumper, setLumper] = useState<string>("0");

  const hoursTotal = diffHours(checkIn, checkOut);
  const billableHours = Math.max(0, hoursTotal - (Number(freeHours) || 0));
  const detention = billableHours * (Number(rate) || 0);
  const lumperAmt = Number(lumper) || 0;
  const total = detention + lumperAmt;

  const onCalculate = () => {
    toast({
      title: "Calculated",
      description: `Detention: $${detention.toFixed(2)} • Lumper: $${lumperAmt.toFixed(2)} • Total: $${total.toFixed(2)}`,
    });
  };

  return (
    <Card className="shadow-[var(--shadow-elevated)]">
      <CardHeader>
        <CardTitle>Detention & Lumper Calculator</CardTitle>
        <CardDescription>Figure out detention and lumper totals in seconds.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="in">Check-In</Label>
            <Input id="in" type="datetime-local" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="out">Check-Out</Label>
            <Input id="out" type="datetime-local" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="free">Free Hours</Label>
            <Input id="free" type="number" inputMode="numeric" value={freeHours} onChange={(e) => setFreeHours(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="rate">Detention Rate ($/hr)</Label>
            <Input id="rate" type="number" inputMode="numeric" value={rate} onChange={(e) => setRate(e.target.value)} />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="lumper">Lumper ($)</Label>
            <Input id="lumper" type="number" inputMode="numeric" value={lumper} onChange={(e) => setLumper(e.target.value)} />
          </div>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Button variant="hero" onClick={onCalculate}>Calculate</Button>
          <div className="text-sm text-muted-foreground">
            Hours on site: {hoursTotal.toFixed(2)} • Billable: {billableHours.toFixed(2)}
          </div>
        </div>
        <div className="mt-3 text-sm">
          <strong>Total:</strong> ${total.toFixed(2)} ({`Detention $${detention.toFixed(2)} + Lumper $${lumperAmt.toFixed(2)}`})
        </div>
      </CardContent>
    </Card>
  );
}
