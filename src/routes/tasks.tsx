import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ListTodo } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ToolShell } from "@/components/tool-shell";
import { AiDisclaimer } from "@/components/ai-disclaimer";
import { PageHeader } from "@/components/page-header";
import { planTasks } from "@/lib/ai.functions";

export const Route = createFileRoute("/tasks")({
  head: () => ({ meta: [{ title: "AI Task Planner — Workplace AI" }] }),
  component: TasksPage,
});

function TasksPage() {
  const [goal, setGoal] = useState("");
  const [deadline, setDeadline] = useState("");
  const [context, setContext] = useState("");

  return (
    <div className="space-y-6">
      <PageHeader
        title="AI Task Planner"
        subtitle="Turn a goal into a prioritized, actionable plan."
      />
      <AiDisclaimer />
      <ToolShell
        title="Plan"
        description="Describe what you're trying to accomplish."
        icon={<ListTodo className="h-5 w-5" />}
        runDisabled={!goal.trim()}
        runLabel="Generate plan"
        inputForm={
          <>
            <div className="space-y-1.5">
              <Label htmlFor="goal">Goal</Label>
              <Input id="goal" placeholder="e.g. Launch new pricing page" value={goal} onChange={(e) => setGoal(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="deadline">Deadline (optional)</Label>
              <Input id="deadline" placeholder="e.g. In 2 weeks" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="ctx">Context (optional)</Label>
              <Textarea
                id="ctx"
                placeholder="Anything else the planner should know — team size, constraints, etc."
                value={context}
                onChange={(e) => setContext(e.target.value)}
                className="min-h-[120px]"
              />
            </div>
          </>
        }
        onRun={async () => {
          const res = await planTasks({ data: { goal, deadline, context } });
          return res.text;
        }}
      />
    </div>
  );
}
