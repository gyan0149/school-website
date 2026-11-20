import type { ReactNode } from "react";

// Small renderer for AI answers: paragraphs, bullet/numbered lists, **bold** and simple tables.
function inline(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i} className="font-semibold text-slate-900">
        {part.slice(2, -2)}
      </strong>
    ) : (
      part
    ),
  );
}

function cells(row: string): string[] {
  return row.trim().replace(/^\||\|$/g, "").split("|").map((c) => c.trim());
}

export function Markdown({ text }: { text: string }) {
  const blocks = text.trim().split(/\n\s*\n/);
  return (
    <div className="space-y-3 leading-relaxed">
      {blocks.map((block, bi) => {
        const lines = block.split("\n").filter((l) => l.trim());
        if (lines.length >= 2 && lines.every((l) => l.trim().startsWith("|"))) {
          const rows = lines.filter((l) => !/^\s*\|?\s*:?-{2,}/.test(l));
          const [head, ...body] = rows.map(cells);
          return (
            <div key={bi} className="overflow-x-auto">
              <table className="min-w-full border border-slate-200 text-left text-sm">
                <thead className="bg-brand-50">
                  <tr>
                    {head.map((c, i) => (
                      <th key={i} className="border border-slate-200 px-2 py-1.5">
                        {inline(c)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {body.map((r, ri) => (
                    <tr key={ri}>
                      {r.map((c, i) => (
                        <td key={i} className="border border-slate-200 px-2 py-1.5">
                          {inline(c)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
        if (lines.every((l) => /^\s*[-•*]\s/.test(l))) {
          return (
            <ul key={bi} className="list-disc space-y-1 pl-5 marker:text-accent-500">
              {lines.map((l, i) => (
                <li key={i}>{inline(l.replace(/^\s*[-•*]\s/, ""))}</li>
              ))}
            </ul>
          );
        }
        if (/^\s*\d+[.)]\s/.test(lines[0]) && lines.every((l) => /^\s*\d+[.)]\s/.test(l) || /^\s{2,}/.test(l))) {
          // Indented lines continue the numbered item above them.
          const items: string[][] = [];
          for (const l of lines) {
            if (/^\s*\d+[.)]\s/.test(l)) items.push([l.replace(/^\s*\d+[.)]\s/, "")]);
            else items[items.length - 1].push(l.trim());
          }
          return (
            <ol key={bi} className="list-decimal space-y-1 pl-5 marker:font-semibold marker:text-brand-700">
              {items.map((parts, i) => (
                <li key={i}>
                  {parts.map((p, pi) => (
                    <span key={pi}>
                      {pi > 0 && <br />}
                      {inline(p)}
                    </span>
                  ))}
                </li>
              ))}
            </ol>
          );
        }
        return (
          <p key={bi}>
            {lines.map((l, i) => (
              <span key={i}>
                {i > 0 && <br />}
                {/^\s*[-•*]\s/.test(l) ? "• " : ""}
                {inline(l.replace(/^\s*[-•*]\s/, "").replace(/^#+\s*/, ""))}
              </span>
            ))}
          </p>
        );
      })}
    </div>
  );
}
