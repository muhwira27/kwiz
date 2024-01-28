import type { Metadata } from 'next';
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionary';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { SidebarProvider } from '@/context/SidebarContext';

export const metadata: Metadata = {
  title: 'Kwiz',
  description:
    'Kwiz: Your interactive platform with various quiz categories. Learn, play and track your progress!',
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  const { menu } = await getDictionary(params.lang);
  const { header } = await getDictionary(params.lang);

  return (
    <SidebarProvider>
      <section
        className={`grid h-screen w-full grid-cols-[auto,1fr] md:grid-cols-[${Sidebar.length},1fr]`}
      >
        <Sidebar menu={menu} lang={params.lang} />
        <section className="flex flex-col overflow-auto sm:pr-6 md:pr-7 lg:pr-8">
          <Header header={header} />
          {children}
        </section>
      </section>
    </SidebarProvider>
  );
}
