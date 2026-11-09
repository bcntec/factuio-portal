import { CheckIcon } from "lucide-react";

type Option = { value: string; label: string };

/** Opciones visibles de una vez (radio), con la marca; sustituye al desplegable. */
export function ProfileOptions({ name, legend, options }: { name: string; legend: string; options: readonly Option[] }) {
  return (
    <fieldset>
      <legend className="text-sm font-bold text-navy">{legend}</legend>
      <div className="mt-2 grid gap-2">
        {options.map((o) => (
          <label
            key={o.value}
            className="group flex cursor-pointer items-center justify-between gap-3 rounded-lg border border-border bg-card px-4 py-3 text-ink transition-colors hover:border-line-strong has-[:checked]:border-electric has-[:checked]:bg-mint-tint has-[:checked]:font-semibold has-[:checked]:text-electric has-[:focus-visible]:ring-[3px] has-[:focus-visible]:ring-ring/30"
          >
            <span>{o.label}</span>
            <input type="radio" name={name} value={o.value} required className="peer sr-only" />
            <span aria-hidden className="flex size-5 shrink-0 items-center justify-center rounded-full border border-line-strong bg-card text-white peer-checked:border-electric peer-checked:bg-electric">
              <CheckIcon className="size-3.5 opacity-0 group-has-[:checked]:opacity-100" />
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
