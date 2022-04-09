export class Statistics {
    constructor(
        public surveyStatistics?: SurveyStatistics[],
        public respondStatistics?: RespondStatistics[]
    ){}
}

export class SurveyStatistics {
    constructor(
        public _id?: string,
        public numOfSurveyResponds?: number,
    ){}
}

export class RespondStatistics {
    constructor(
        public _id?: RespondStatisticsId,
        public numOfResponds?: number
    ){}
}

export class RespondStatisticsId {
    constructor(
        public questionId?: number,
        public questionText?: string,
        public answer?: string
    ){}
}
