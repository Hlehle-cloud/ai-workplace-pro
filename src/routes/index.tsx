import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, FileText, ListTodo, Search, MessageSquare, ArrowRight, Sparkles } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AiDisclaimer } from "@/components/ai-disclaimer";
import { PageHeader } from "@/components/page-header";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — Workplace AI" },
      { name: "description", content: "AI Workplace Productivity Assistant dashboard." },
    ],
  }),
  component: Dashboard,
});

const tools = [
  {
    title: "Smart Email Generator",
    description: "Draft polished emails from a few key points and a chosen tone.",
    url: "/email",
    icon: Mail,
  },
  {
    title: "Meeting Notes Summarizer",
    description: "Turn raw notes into decisions, action items, and follow-ups.",
    url: "/meeting-notes",
    icon: FileText,
  },
  {
    title: "AI Task Planner",
    description: "Break a goal into a prioritized, actionable task list.",
    url: "/tasks",
    icon: ListTodo,
  },
  {
    title: "AI Research Assistant",
    description: "Get a structured briefing on any workplace topic.",
    url: "/research",
    icon: Search,
  },
  {
    title: "AI Chatbot",
    description: "Ask anything — a general-purpose assistant for work.",
    url: "/chat",
    icon: MessageSquare,
  },
] as const;

function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border bg-gradient-to-br from-accent/60 via-background to-background p-6 md:p-8">
        <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-primary">
          <Sparkles className="h-3.5 w-3.5" />
          Productivity Suite
        </div>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
          Get more done with AI-assisted workplace tools
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Draft emails, summarize meetings, plan tasks, and research topics — all from a clean,
          unified workspace.
        </p>
      </div>

      <AiDisclaimer />

      <PageHeader title="Tools" subtitle="Pick a workflow to get started." />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((t) => (
          <Link key={t.url} to={t.url} className="group">
            <Card className="h-full transition-all hover:border-primary/40 hover:shadow-md">
              <CardHeader>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                  <t.icon className="h-5 w-5" />
                </div>
                <CardTitle className="mt-3 text-base">{t.title}</CardTitle>
                <CardDescription>{t.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm font-medium text-primary">
                  Open
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
