export default function MainSection({ children }: { children: React.ReactNode }) {
  return (
    <main className="w-full md:w-3/5 pr-8">
      {children}
    </main>
  );
}
