import { collection, getDocs, query, limit } from 'firebase/firestore';
import { db } from '../config';
import { CategoryProps } from './category';

export default async function getFeaturedCategory(
  lang: string
): Promise<CategoryProps[] | undefined> {
  try {
    const categoriesQuery = query(collection(db, 'category'), limit(4));
    const querySnapshot = await getDocs(categoriesQuery);

    const categories: CategoryProps[] = [];

    querySnapshot.forEach((doc) => {
      const categoryData = doc.data();
      const category = {
        id: doc.id,
        name: lang === 'en' ? categoryData.enName : categoryData.idName,
        thumbnail: categoryData.thumbnail,
        quizzes: categoryData.quizzes
      }
      categories.push(category);
    });

    return categories;
  } catch (error) {
    console.error('Error getting featured category:', error);
    return undefined;
  }
}
