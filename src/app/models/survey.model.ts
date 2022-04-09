export class Survey{

    constructor(
        public _id?: string,
        public title?: string,
        public template?: string,
        public questionId?: number[],
        public questionText?: string[],
        public questionOptionText?: string[],
        public startDate?: string,
        public endDate?: string,
        public publish?: boolean

    )
    {}
}
