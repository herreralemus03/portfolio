import { getDictionary } from "@/lib/i18n";
import { PageLayout }  from "@/app/components/PageLayout";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = getDictionary(lang);
  return { title: t.meta.title, description: t.meta.description };
}

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = getDictionary(lang);
  return <PageLayout lang={lang} t={t} />;
}
