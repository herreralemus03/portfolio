import { getDictionary } from "@/lib/i18n";
import { AppBar }      from "@/app/components/AppBar";
import { PageLayout }  from "@/app/components/PageLayout";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = getDictionary(lang);
  return { title: t.meta.title, description: t.meta.description };
}

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = getDictionary(lang);

  return (
    <div id="top" style={{ minHeight: "100vh", background: "var(--md-surface)" }}>
      <AppBar lang={lang} t={t} />
      <PageLayout lang={lang} t={t} />
    </div>
  );
}
