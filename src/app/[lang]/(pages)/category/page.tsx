import React from 'react';
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionary';
import getAllCategory from '@/firebase/category/getAllCategory';
import CategoryCard from '@/components/CategoryCard';

export default async function Category({
  params,
}: {
  params: { lang: Locale };
}) {
  const { category } = await getDictionary(params.lang);
  const categoryData = await getAllCategory(params.lang);

  return (
    <main className="mb-3 mt-2 flex h-fit w-full flex-col gap-10 rounded-large bg-white px-6 py-6 shadow-custom1 sm:mt-3 md:mb-5 lg:px-9 lg:py-10">
      <section className="flex w-lvw flex-col gap-2 text-slate-grey md:w-full">
        <h2 className="text-lgx font-bold sm:text-xxl">{category.title}</h2>
        <p className="text-base sm:text-lgx">{category.subtitle}</p>
      </section>

      <section className="grid w-fit grid-cols-2 gap-6 sm:flex sm:flex-wrap ">
        {categoryData &&
          categoryData.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
      </section>
    </main>
  );
}
