import React from 'react';
import { Locale } from '@/i18n.config';
import Tabs from '../tabs';
import Table from './table';
import { getDictionary } from '@/lib/dictionary';

export default async function Settings({
  params,
}: {
  params: { lang: Locale };
}) {
  const { settings } = await getDictionary(params.lang);
  const { common } = await getDictionary(params.lang);
  return (
    <Tabs lang={params.lang} settings={settings}>
      <Table lang={params.lang} settings={settings} loadingText={common.loading} />
    </Tabs>
  );
}
