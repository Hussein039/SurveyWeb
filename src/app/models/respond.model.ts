export class Respond{
    constructor(
        public _id?: string,
        public surveyId?: string,
        public username?: string,
        public responses?: Responses[],
        public responseDate?: Date
    ){}
}

export class Responses {
    constructor(
        public _id?: string,
        public questionId?: number,
        public questionText?: string,
        public answer?: string,
    ){}
}
