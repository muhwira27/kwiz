import { collection, getDocs, query, limit } from 'firebase/firestore';
import { db } from '../config';
import { CategoryProps } from './category';

export default async function getFeaturedCategories(
  lang: string
): Promise<string[] | undefined> {
  const nameKey = lang === 'en' ? 'enName' : 'idName';

  try {
    const categoriesQuery = query(collection(db, 'category'), limit(4));
    const querySnapshot = await getDocs(categoriesQuery);

    const categories: string[] = [];

    querySnapshot.forEach((doc) => {
      const categoryData = doc.data() as CategoryProps;
      const categoryName = categoryData[nameKey];
      categories.push(categoryName);
    });

    return categories;
  } catch (error) {
    console.error('Error getting featured category:', error);
    return undefined;
  }
}
