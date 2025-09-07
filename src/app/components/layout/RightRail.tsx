export default function RightRail({ children }: { children: React.ReactNode }) {
  return (
    <aside className="w-full md:w-2/5 px-4 py-2">
      {children}
    </aside>
  );
}
