import React from 'react';
import { Locale } from '@/i18n.config';
import Tabs from './tabs';
import Content from './content';

export default async function Settings({
  params,
}: {
  params: { lang: Locale };
}) {
  return (
    <Tabs lang={params.lang}>
      <Content />
    </Tabs>
  );
}
