export const CONTENT_CATEGORIES: ReadonlyArray<{ value: string | null; label: string }> = [
  { value: null, label: "All articles" },
  { value: "academic", label: "Academic" },
  { value: "visa-process", label: "Visa process" },
  { value: "financial", label: "Financial" },
  { value: "preparation", label: "Preparation" },
  { value: "ifem-news", label: "IFEM news" },
  { value: "university-updates", label: "University updates" },
];

const LABELS = Object.fromEntries(
  CONTENT_CATEGORIES.filter((category): category is { value: string; label: string } => category.value !== null)
    .map((category) => [category.value, category.label]),
);

export function getContentCategoryLabel(value: string): string {
  return LABELS[value] ?? value;
}
