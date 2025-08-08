import { useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

interface RateCon {
  temp: string;
  po: string; // PO / PU#
  seal: string;
  location: string; // City, ST or address
  time: string; // ISO / datetime-local
}

const normalize = (s: string) => s.trim().toLowerCase().replace(/\s+/g, " ");

function compare(rc: RateCon, bol: RateCon) {
  const issues: string[] = [];
  if (normalize(rc.temp) !== normalize(bol.temp)) issues.push("Temperature does not match");
  if (normalize(rc.po) !== normalize(bol.po)) issues.push("PO/PU# does not match");
  if (normalize(rc.seal) !== normalize(bol.seal)) issues.push("Seal# does not match");
  if (normalize(rc.location) !== normalize(bol.location)) issues.push("Delivery location does not match");
  if (normalize(rc.time) !== normalize(bol.time)) issues.push("Delivery time does not match");
  return issues;
}

const SAMPLE: RateCon = {
  temp: "34F",
  po: "PO-12345",
  seal: "SEAL9876",
  location: "Dallas, TX",
  time: "2025-08-08T10:00",
};

function randomizeMistake(rc: RateCon): RateCon {
  const options: Array<keyof RateCon> = ["temp", "po", "seal", "location", "time"];
  const key = options[Math.floor(Math.random() * options.length)];
  const clone = { ...rc };
  switch (key) {
    case "temp": clone.temp = "36F"; break;
    case "po": clone.po = rc.po + "-X"; break;
    case "seal": clone.seal = rc.seal.slice(0, -1) + "0"; break;
    case "location": clone.location = "Fort Worth, TX"; break;
    case "time": clone.time = "2025-08-08T12:00"; break;
  }
  return clone;
}

export default function BolRateConChecker() {
  const [rateCon, setRateCon] = useState<RateCon>(SAMPLE);
  const [bol, setBol] = useState<RateCon>(SAMPLE);

  const issues = useMemo(() => compare(rateCon, bol), [rateCon, bol]);
  const score = 5 - issues.length;

  const onCheck = () => {
    if (issues.length === 0) {
      toast({ title: "All matched!", description: "BOL matches the Rate Confirmation. Ship it!" });
    } else {
      toast({ title: `${issues.length} issue(s) found`, description: issues.join(" • "), variant: "destructive" as any });
    }
  };

  const setField = (obj: RateCon, setter: (v: RateCon) => void, key: keyof RateCon) => (v: string) => setter({ ...obj, [key]: v });

  return (
    <Card className="shadow-[var(--shadow-elevated)]">
      <CardHeader>
        <CardTitle>BOL vs Rate Con Checker</CardTitle>
        <CardDescription>Make sure your BOL matches the dispatch details.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Rate Confirmation</h3>
            <Field id="rc-temp" label="Temperature" value={rateCon.temp} onChange={setField(rateCon, setRateCon, "temp")} placeholder="e.g. 34F" />
            <Field id="rc-po" label="PO / PU#" value={rateCon.po} onChange={setField(rateCon, setRateCon, "po")} placeholder="e.g. PO-12345" />
            <Field id="rc-seal" label="Seal#" value={rateCon.seal} onChange={setField(rateCon, setRateCon, "seal")} placeholder="e.g. SEAL9876" />
            <Field id="rc-loc" label="Delivery Location" value={rateCon.location} onChange={setField(rateCon, setRateCon, "location")} placeholder="City, ST or address" />
            <Field id="rc-time" label="Delivery Time" type="datetime-local" value={rateCon.time} onChange={setField(rateCon, setRateCon, "time")} />
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Bill of Lading (BOL)</h3>
            <Field id="bol-temp" label="Temperature" value={bol.temp} onChange={setField(bol, setBol, "temp")} placeholder="e.g. 34F" />
            <Field id="bol-po" label="PO / PU#" value={bol.po} onChange={setField(bol, setBol, "po")} placeholder="e.g. PO-12345" />
            <Field id="bol-seal" label="Seal#" value={bol.seal} onChange={setField(bol, setBol, "seal")} placeholder="e.g. SEAL9876" />
            <Field id="bol-loc" label="Delivery Location" value={bol.location} onChange={setField(bol, setBol, "location")} placeholder="City, ST or address" />
            <Field id="bol-time" label="Delivery Time" type="datetime-local" value={bol.time} onChange={setField(bol, setBol, "time")} />
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Button variant="hero" onClick={onCheck}>Check BOL</Button>
          <Button variant="outline" onClick={() => { setRateCon(SAMPLE); setBol(SAMPLE); }}>Load Sample</Button>
          <Button variant="secondary" onClick={() => setBol(randomizeMistake(rateCon))}>Introduce a Mistake</Button>
          <span className="text-sm text-muted-foreground">Score: {score}/5</span>
        </div>

        {issues.length > 0 && (
          <ul className="mt-4 list-disc pl-5 text-sm text-destructive-foreground">
            {issues.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}

function Field({ id, label, value, onChange, placeholder, type = "text" }: { id: string; label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
    </div>
  );
}
