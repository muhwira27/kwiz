import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config';
import { CategoryProps } from './category';

export default async function getAllCategories(
  lang: string
): Promise<string[] | undefined> {
  const nameKey = lang === 'en' ? 'enName' : 'idName';

  try {
    const querySnapshot = await getDocs(collection(db, 'category'));
    const categories: string[] = [];

    querySnapshot.forEach((doc) => {
      const categoryData = doc.data() as CategoryProps;
      const categoryName = categoryData[nameKey];
      categories.push(categoryName);
    });

    return categories;
  } catch (error) {
    console.error('Error getting all category:', error);
    return undefined;
  }
}
