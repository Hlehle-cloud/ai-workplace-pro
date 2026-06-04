import { useState, type ReactNode } from "react";
import { Loader2, Copy, Check } from "lucide-react";
import ReactMarkdown from "react-markdown";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface ToolShellProps {
  title: string;
  description: string;
  icon: ReactNode;
  inputForm: ReactNode;
  onRun: () => Promise<string>;
  runDisabled?: boolean;
  runLabel?: string;
}

export function ToolShell({
  title,
  description,
  icon,
  inputForm,
  onRun,
  runDisabled,
  runLabel = "Generate",
}: ToolShellProps) {
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const handleRun = async () => {
    setLoading(true);
    try {
      const result = await onRun();
      setOutput(result);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-accent-foreground">
              {icon}
            </div>
            <div>
              <CardTitle>{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {inputForm}
          <Button onClick={handleRun} disabled={loading || runDisabled} className="w-full">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating…
              </>
            ) : (
              runLabel
            )}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle className="text-base">Output</CardTitle>
            <CardDescription>Editable — review before sharing</CardDescription>
          </div>
          {output && (
            <Button size="sm" variant="outline" onClick={handleCopy}>
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          )}
        </CardHeader>
        <CardContent className="space-y-3">
          <Textarea
            value={output}
            onChange={(e) => setOutput(e.target.value)}
            placeholder="Your AI-generated result will appear here. You can edit it freely."
            className="min-h-[320px] font-mono text-sm"
          />
          {output && (
            <details className="rounded-md border bg-muted/30 p-3 text-sm">
              <summary className="cursor-pointer font-medium">Preview formatted</summary>
              <div className="prose prose-sm mt-3 max-w-none dark:prose-invert">
                <ReactMarkdown>{output}</ReactMarkdown>
              </div>
            </details>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
