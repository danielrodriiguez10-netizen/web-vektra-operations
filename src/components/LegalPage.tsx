export function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <article className="container-page max-w-3xl py-14 sm:py-20">
      <h1 className="text-4xl font-bold">{title}</h1>
      <div className="mt-8 space-y-5 [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-semibold [&_li]:ml-5 [&_li]:list-disc">
        {children}
      </div>
    </article>
  );
}
