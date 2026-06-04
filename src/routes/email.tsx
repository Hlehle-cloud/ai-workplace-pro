import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToolShell } from "@/components/tool-shell";
import { AiDisclaimer } from "@/components/ai-disclaimer";
import { PageHeader } from "@/components/page-header";
import { generateEmail } from "@/lib/ai.functions";

export const Route = createFileRoute("/email")({
  head: () => ({ meta: [{ title: "Smart Email Generator — Workplace AI" }] }),
  component: EmailPage,
});

function EmailPage() {
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [tone, setTone] = useState("professional");
  const [keyPoints, setKeyPoints] = useState("");

  return (
    <div className="space-y-6">
      <PageHeader
        title="Smart Email Generator"
        subtitle="Draft a polished email from a few quick inputs."
      />
      <AiDisclaimer />
      <ToolShell
        title="Compose"
        description="Tell the AI who it's for and what it should cover."
        icon={<Mail className="h-5 w-5" />}
        runDisabled={!keyPoints.trim()}
        runLabel="Generate email"
        inputForm={
          <>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="recipient">Recipient</Label>
                <Input id="recipient" placeholder="e.g. Sarah, my manager" value={recipient} onChange={(e) => setRecipient(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="subject">Subject hint</Label>
                <Input id="subject" placeholder="(optional)" value={subject} onChange={(e) => setSubject(e.target.value)} />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Tone</Label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="friendly">Friendly</SelectItem>
                  <SelectItem value="formal">Formal</SelectItem>
                  <SelectItem value="concise">Concise</SelectItem>
                  <SelectItem value="apologetic">Apologetic</SelectItem>
                  <SelectItem value="persuasive">Persuasive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="points">Key points</Label>
              <Textarea
                id="points"
                placeholder="What should the email say? List the main points."
                value={keyPoints}
                onChange={(e) => setKeyPoints(e.target.value)}
                className="min-h-[160px]"
              />
            </div>
          </>
        }
        onRun={async () => {
          const res = await generateEmail({ data: { recipient, subject, tone, keyPoints } });
          return res.text;
        }}
      />
    </div>
  );
}
