import { Quiz } from "./quiz.model";

export class QuizService {
  private quizzes: Quiz[] = [
    new Quiz('Film','Easy','https://opentdb.com/api.php?amount=10&category=11&difficulty=easy&type=multiple'),
    new Quiz('Film','Medium','https://opentdb.com/api.php?amount=10&category=11&difficulty=medium&type=multiple'),
    new Quiz('Film','Hard','https://opentdb.com/api.php?amount=10&category=11&difficulty=hard&type=multiple'),

    new Quiz('Books','Easy','https://opentdb.com/api.php?amount=10&category=10&difficulty=easy&type=multiple'),
    new Quiz('Books','Medium','https://opentdb.com/api.php?amount=10&category=10&difficulty=medium&type=multiple'),
    new Quiz('Books','Hard','https://opentdb.com/api.php?amount=10&category=10&difficulty=hard&type=multiple'),

    new Quiz('Music','Easy','https://opentdb.com/api.php?amount=10&category=12&difficulty=easy&type=multiple'),
    new Quiz('Music','Medium','https://opentdb.com/api.php?amount=10&category=12&difficulty=medium&type=multiple'),
    new Quiz('Music','Hard','https://opentdb.com/api.php?amount=10&category=12&difficulty=hard&type=multiple'),

    new Quiz('Video Games','Easy','https://opentdb.com/api.php?amount=10&category=15&difficulty=easy&type=multiple'),
    new Quiz('Video Games','Medium','https://opentdb.com/api.php?amount=10&category=15&difficulty=medium&type=multiple'),
    new Quiz('Video Games','Hard','https://opentdb.com/api.php?amount=10&category=15&difficulty=hard&type=multiple'),

    new Quiz('Sports','Easy','https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple'),
    new Quiz('Sports','Medium','https://opentdb.com/api.php?amount=10&category=21&difficulty=medium&type=multiple'),
    new Quiz('Sports','Hard','https://opentdb.com/api.php?amount=10&category=21&difficulty=hard&type=multiple'),

    new Quiz('History','Easy','https://opentdb.com/api.php?amount=10&category=23&difficulty=easy&type=multiple'),
    new Quiz('History','Medium','https://opentdb.com/api.php?amount=10&category=23&difficulty=medium&type=multiple'),
    new Quiz('History','Hard','https://opentdb.com/api.php?amount=10&category=23&difficulty=hard&type=multiple'),
  ];

  getQuizzes(){
    return this.quizzes.slice();
  }
}