import { AlertTriangle } from "lucide-react";

export function AiDisclaimer() {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
      <p>
        AI-generated content may contain errors or omissions. Always review outputs before sending,
        sharing, or acting on them. Avoid sharing confidential or regulated data you are not
        permitted to disclose.
      </p>
    </div>
  );
}
