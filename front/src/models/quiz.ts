export interface QuizItem {
    id: number,
    quizType: string,
    quiz: string,
    quizUrl: string,
    answer: string,
    one: string,
    two: string,
    three: string,
    four: string,
    answerList: string[],
    game: string,
    timer: number,
}


export interface QuizSet {
    id: number,
    name: string,
    hostId: number,
    quizList: QuizItem[];
}