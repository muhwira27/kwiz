import React from 'react';
import Image from 'next/image';
import { CategoryProps } from '@/firebase/category/category';

export default function CategoryCard({
  category,
}: {
  category: CategoryProps;
}) {
  return (
    <section className="flex flex-col">
      <div className="relative h-32 w-40 overflow-hidden rounded-large min-[492px]:h-36 min-[492px]:w-52 min-[580px]:h-40 min-[580px]:w-56 min-[600px]:h-44 min-[600px]:w-60 min-[960px]:h-36 min-[960px]:w-48 min-[1080px]:h-36 min-[1080px]:w-48 min-[1232px]:h-44 min-[1232px]:w-60">
        <Image
          src={category.thumbnail}
          alt={category.name}
          priority
          fill
          className="object-cover object-center"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute bottom-4 left-5 font-semibold text-white md:text-lgx">
          <h5>{category.name}</h5>
        </div>
      </div>
    </section>
  );
}
