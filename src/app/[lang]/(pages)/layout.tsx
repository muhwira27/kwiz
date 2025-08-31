import type { Metadata } from 'next';
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionary';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import RouteLoading from '@/components/RouteLoading';
import { RouteChangesProvider } from 'nextjs-router-events';
import { SidebarProvider } from '@/context/SidebarContext';
import { AuthUserProvider } from '@/firebase/auth/AuthUserProvider';

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
    <AuthUserProvider>
      <RouteChangesProvider>
        <SidebarProvider>
          <section className={`grid h-screen w-full md:grid-cols-[auto,1fr]`}>
            <Sidebar menu={menu} lang={params.lang} />
            <section className="relative flex w-full flex-col overflow-auto sm:px-6 md:px-7 lg:pr-8">
              <Header lang={params.lang} header={header} />
              <RouteLoading />
              {children}
            </section>
          </section>
        </SidebarProvider>
      </RouteChangesProvider>
    </AuthUserProvider>
  );
}
