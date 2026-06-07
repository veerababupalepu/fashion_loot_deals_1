import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { GlassCard } from "@/components/ui/GlassCard";

interface StaticPageProps {
  title: string;
  children: React.ReactNode;
}

export function StaticPage({ title, children }: StaticPageProps) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Breadcrumb items={[{ label: title }]} className="mb-6" />
      <h1 className="text-3xl md:text-4xl font-bold mb-8">{title}</h1>
      <GlassCard className="p-8">
        <div className="prose dark:prose-invert max-w-none text-neutral-600 dark:text-neutral-400">
          {children}
        </div>
      </GlassCard>
    </div>
  );
}
