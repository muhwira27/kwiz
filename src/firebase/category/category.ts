export interface CategoryProps {
  id: string;
  enName: string;
  idName: string;
  quizzes: string[];
}

export async function jsonToCategory(json: {
  [key: string]: any;
}): Promise<CategoryProps> {
  return {
    id: json.id || '',
    enName: json.enName || '',
    idName: json.idName || '',
    quizzes: json.quizzez || [],
  };
}
