import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

type StatusId = "todo" | "in-progress" | "done";

interface Status {
  id: StatusId;
  label: string;
  dotClass: string;
}

const STATUSES: Status[] = [
  { id: "todo", label: "To do", dotClass: "bg-gray-300" },
  { id: "in-progress", label: "In progress", dotClass: "bg-yellow-500" },
  { id: "done", label: "Done", dotClass: "bg-green-600" },
];

interface StatusSelectorProps {
  status?: StatusId;
  onChange?: (status: StatusId) => void;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
}

export default function StatusSelector({
  status = "todo",
  onChange,
  onOpenChange,
  disabled = false,
}: StatusSelectorProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = STATUSES.find((s) => s.id === status) ?? STATUSES[0];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        onOpenChange?.(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={ref}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => {
          setOpen((v) => {
            onOpenChange?.(!v);
            return !v;
          });
        }}
        className="flex items-center gap-1.5 rounded-full border border-gray-400 bg-white px-3 py-1 text-sm text-gray-700 shadow-sm transition-colors cursor-pointer hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <span className={`h-2 w-2 rounded-full ${current.dotClass}`} />
        <span>{current.label}</span>
        <ChevronDown size={14} className="text-gray-400" />
      </button>

      {open && (
        <div className="absolute right-0 z-10 mt-1.5 w-36 rounded-xl border border-gray-400 bg-white py-0.5 shadow-lg">
          {STATUSES.map((s) => (
            <button
              key={s.id}
              type="button"
              disabled={disabled}
              onClick={() => {
                onChange?.(s.id);
                setOpen(false);
                onOpenChange?.(false);
              }}
              className="flex w-full items-center gap-2 px-3 py-1 text-left text-sm text-gray-700 hover:bg-gray-200 cursor-pointer rounded-md"
            >
              <span className={`h-2 w-2 rounded-full ${s.dotClass}`} />
              <span className="flex-1">{s.label}</span>
              {status === s.id && <Check size={14} className="text-green-500" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}