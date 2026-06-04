import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FileText } from "lucide-react";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ToolShell } from "@/components/tool-shell";
import { AiDisclaimer } from "@/components/ai-disclaimer";
import { PageHeader } from "@/components/page-header";
import { summarizeMeeting } from "@/lib/ai.functions";

export const Route = createFileRoute("/meeting-notes")({
  head: () => ({ meta: [{ title: "Meeting Notes Summarizer — Workplace AI" }] }),
  component: MeetingPage,
});

function MeetingPage() {
  const [notes, setNotes] = useState("");

  return (
    <div className="space-y-6">
      <PageHeader
        title="Meeting Notes Summarizer"
        subtitle="Paste raw notes — get a TL;DR, decisions, and action items."
      />
      <AiDisclaimer />
      <ToolShell
        title="Notes"
        description="Paste meeting notes or a transcript."
        icon={<FileText className="h-5 w-5" />}
        runDisabled={!notes.trim()}
        runLabel="Summarize"
        inputForm={
          <div className="space-y-1.5">
            <Label htmlFor="notes">Raw notes</Label>
            <Textarea
              id="notes"
              placeholder="Paste your meeting notes here…"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[280px]"
            />
          </div>
        }
        onRun={async () => {
          const res = await summarizeMeeting({ data: { notes } });
          return res.text;
        }}
      />
    </div>
  );
}
