export interface getQuizItem {
    id: number,
    type: string,
    quiz: string,
    question: string,
    quizUrl: string,
    answer: string,
    answerList: string,
    one: string,
    two: string,
    three: string,
    four: string,
    game: string,
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
    quizList: getQuizItem[]
}

export interface setQuizSet {
    hostId:string,
    templateId: number,
    quizList: setQuizItem[]
}


export interface EmotionResult {
    roi: {x: number, y: number, width: number, height: number}
    value: string,
    confidence: number
}