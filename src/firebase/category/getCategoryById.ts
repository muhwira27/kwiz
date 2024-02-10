import { db } from '../config';
import { doc, getDoc } from 'firebase/firestore';
import { CategoryProps } from './category';

export const getCategoryById = async (categoryId: string, lang: string): Promise<CategoryProps | undefined> => {
  try {
    const categoryRef = doc(db, 'category', categoryId);
    const categoryDoc = await getDoc(categoryRef);
    
    if(categoryDoc.exists()) {
      const categoryData = categoryDoc.data();
      const category = {
        id: categoryDoc.id,
        name: lang === 'en' ? categoryData?.enName : categoryData?.idName,
        thumbnail: categoryData?.thumbnail,
        quizzes: categoryData?.quizzes,
      };
      return category;
    }
    
    return undefined;

  } catch (error) {
    console.error('Error getting category by id:', error);
    return undefined;
  }
}
