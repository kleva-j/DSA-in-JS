export function DataStructuresPageRoute() {
  return (
    <section className="flex flex-col flex-1 gap-4">
      <div className="border p-3 rounded-lg">
        <h2 className="text-xl font-bold">Data Structures</h2>
      </div>
      {Array.from({ length: 24 }).map((_, index) => (
        <div
          key={btoa(index.toString())}
          className="aspect-video h-12 w-full rounded-lg bg-muted/50"
        />
      ))}
    </section>
  );
}
