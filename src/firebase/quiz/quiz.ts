export interface QuizProps {
  id: string;
  name: string;
  thumbnail: string;
  category: string;
  numberOfPlayers: number;
  numberOfQuestions: number;
  timePerQuestion: number;
  scorePerQuestion: number;
  questions: QuestionProps[];
}

export interface QuestionProps {
  question: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  answer: string;
  image: string;
}

export async function jsonToQuiz(json: {
  [key: string]: any;
}): Promise<QuizProps> {
  return {
    id: json.id || '',
    name: json.name || '',
    thumbnail: json.thumbnail || '',
    category: json.category || '',
    numberOfPlayers: json.numberOfPlayers || 0,
    numberOfQuestions: json.numberOfQuestions || 0,
    timePerQuestion: json.timePerQuestion || 0,
    scorePerQuestion: json.scorePerQuestion || 0,
    questions: json.questions
      ? json.questions.map((question: any) => jsonToQuestion(question))
      : [],
  };
}

export function jsonToQuestion(json: { [key: string]: any }): QuestionProps {
  return {
    question: json.question || '',
    option1: json.option1 || '',
    option2: json.option2 || '',
    option3: json.option3 || '',
    option4: json.option4 || '',
    answer: json.answer || '',
    image: json.image || '',
  };
}
