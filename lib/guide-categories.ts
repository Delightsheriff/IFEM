export const GUIDE_CATEGORIES: ReadonlyArray<{ value: string | null; label: string }> = [
  { value: null, label: "All Guides" },
  { value: "academic", label: "Academic" },
  { value: "visa-process", label: "Visa Process" },
  { value: "financial", label: "Financial" },
  { value: "preparation", label: "Preparation" },
];

const LABELS: Record<string, string> = Object.fromEntries(
  GUIDE_CATEGORIES.filter((c): c is { value: string; label: string } => c.value !== null).map(
    (c) => [c.value, c.label],
  ),
);

export function getGuideCategoryLabel(value: string): string {
  return LABELS[value] ?? value;
}
