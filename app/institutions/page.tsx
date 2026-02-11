import PageContentWrapper from "@/components/ui/page-content-wrapper";

export default function Institutions() {
  return (
    <PageContentWrapper>
      <div className="mb-4 space-y-2">
        <h1 className="font-serif text-4xl font-bold text-forest md:text-5xl">
          Welcome to IFEM EDUCATION
        </h1>
        <p className="text-lg text-gray">
          Institutions page content goes here.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="rounded-lg border border-sage/30 bg-white p-6 shadow-sm"
          >
            <div className="mb-3 h-4 w-3/4 rounded bg-sage/30" />
            <div className="space-y-2">
              <div className="h-3 w-full rounded bg-sage/20" />
              <div className="h-3 w-full rounded bg-sage/20" />
              <div className="h-3 w-2/3 rounded bg-sage/20" />
            </div>
          </div>
        ))}
      </div>
    </PageContentWrapper>
  );
}
