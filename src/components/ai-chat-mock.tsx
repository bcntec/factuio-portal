import { Bot, Wrench } from "lucide-react";
import { ia } from "@/content/ia";

/** Maqueta estática de una conversación con un asistente conectado a FactuIO por MCP. */
export function AiChatMock() {
  const m = ia.chatMock;
  return (
    <div aria-hidden="true" className="rounded-xl border border-border bg-card p-5 brutal-shadow-sm">
      <div className="flex items-center gap-2 border-b border-border pb-3">
        <span className="grid size-7 place-items-center rounded-lg bg-navy text-white"><Bot size={15} /></span>
        <p className="bcn-label">{m.client}</p>
      </div>
      <div className="flex flex-col gap-3 pt-4 text-[14px]">
        <p className="ml-auto max-w-[85%] rounded-xl rounded-br-sm bg-sky px-3.5 py-2.5 text-navy">{m.user}</p>
        <div className="flex flex-wrap gap-1.5">
          {m.tools.map((t) => (
            <span key={t} className="inline-flex items-center gap-1 rounded-md bg-mint-tint px-2 py-1 font-mono text-[12px] text-electric">
              <Wrench size={12} />{t}
            </span>
          ))}
        </div>
        <p className="max-w-[92%] rounded-xl rounded-bl-sm bg-muted px-3.5 py-2.5 text-navy">{m.reply}</p>
        <span className="self-start rounded-lg bg-mint px-4 py-2 text-[13px] font-bold text-white">{m.confirm}</span>
      </div>
    </div>
  );
}
