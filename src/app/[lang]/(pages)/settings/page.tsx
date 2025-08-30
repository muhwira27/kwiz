import React from 'react';
import { Locale } from '@/i18n.config';
import Tabs from './tabs';
import Content from './content';
import { getDictionary } from '@/lib/dictionary';

export default async function Settings({
  params,
}: {
  params: { lang: Locale };
}) {
  const { settings } = await getDictionary(params.lang);
  return (
    <Tabs lang={params.lang} settings={settings}>
      <Content settings={settings} />
    </Tabs>
  );
}
