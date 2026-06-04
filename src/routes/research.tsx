import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToolShell } from "@/components/tool-shell";
import { AiDisclaimer } from "@/components/ai-disclaimer";
import { PageHeader } from "@/components/page-header";
import { researchTopic } from "@/lib/ai.functions";

export const Route = createFileRoute("/research")({
  head: () => ({ meta: [{ title: "AI Research Assistant — Workplace AI" }] }),
  component: ResearchPage,
});

function ResearchPage() {
  const [topic, setTopic] = useState("");
  const [depth, setDepth] = useState<"brief" | "standard" | "deep">("standard");

  return (
    <div className="space-y-6">
      <PageHeader
        title="AI Research Assistant"
        subtitle="Get a structured briefing on any workplace topic."
      />
      <AiDisclaimer />
      <ToolShell
        title="Research"
        description="What do you want a briefing on?"
        icon={<Search className="h-5 w-5" />}
        runDisabled={!topic.trim()}
        runLabel="Research topic"
        inputForm={
          <>
            <div className="space-y-1.5">
              <Label htmlFor="topic">Topic or question</Label>
              <Input id="topic" placeholder="e.g. OKRs vs KPIs for a 20-person startup" value={topic} onChange={(e) => setTopic(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Depth</Label>
              <Select value={depth} onValueChange={(v) => setDepth(v as typeof depth)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="brief">Brief</SelectItem>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="deep">Deep dive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        }
        onRun={async () => {
          const res = await researchTopic({ data: { topic, depth } });
          return res.text;
        }}
      />
    </div>
  );
}
