export interface getQuizItem {
    id: number,
    type: String,
    quiz: String,
    question: String,
    quizUrl: String,
    answer: String,
    answerList: String,
    one: String,
    two: String,
    three: String,
    four: String,
    game: String,
    timer: number,
    quizNum: number,
    quizSize: number
}

export interface setQuizItem {

    type: string,
    quiz: string,
    quizUrl: string,
    answer: string,
    one: string,
    two: string,
    three: string,
    four: string,
    question: string,
    answerList: string[],
    game: string,
    timer: number,
}


export interface getQuizSet {

    name: string,
    hostId: number,
    quizList: getQuizItem[];
}

export interface setQuizSet {
    hostId:string,
    templateId: number,
    quizList: setQuizItem[];
}