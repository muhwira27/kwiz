export interface CategoryProps {
  id: string;
  name: string;
  thumbnail: string;
  quizzes: string[];
}

export async function jsonToCategory(json: {
  [key: string]: any;
}): Promise<CategoryProps> {
  return {
    id: json.id || '',
    name: json.name || '',
    thumbnail : json.thumbnail || '',
    quizzes: json.quizzez || [],
  };
}
