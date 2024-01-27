import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config';
import { CategoryProps } from './category';

export default async function getAllCategory(
  lang: string
): Promise<CategoryProps[] | undefined> {
  try {
    const querySnapshot = await getDocs(collection(db, 'category'));
    const categories: CategoryProps[] = [];

    querySnapshot.forEach((doc) => {
      const categoryData = doc.data();
      const category = {
        id: doc.id,
        name: lang === 'en' ? categoryData.enName : categoryData.idName,
        thumbnail: categoryData.thumbnail,
        quizzes: categoryData.quizzes,
      };
      categories.push(category);
    });

    return categories;
  } catch (error) {
    console.error('Error getting all category:', error);
    return undefined;
  }
}
