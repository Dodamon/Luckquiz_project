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
    id?:number,
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
    is_Valid: boolean;
}


export interface getQuizSet {

    name: string,
    hostId: number,
    quizList: getQuizItem[];
}

export interface setQuizSet {
    id?:number,
    name?:string,
    hostId:string,
    templateId: number,
    is_Valid?: boolean,
    quizList: setQuizItem[];
}