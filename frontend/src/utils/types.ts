export type FormsResponse = {
    forms: Questionnaire[];
}

export type SubmissionsResponse = {
    submissions: Submission[];
}

export type Submission = {
    created: string;
    formId: string;
    id: string;
    score: number;
    submitterName: string;
    form: {
        name: string;
        slug: string;
    }
    submissionFields: SubmissionField[]
}

export type SubmissionField = {
    formFieldId: string;
    formSubmissionId: string;
    name: string;
    value: string;
}

export type Questionnaire = {
    id: string;
    name: string;
    slug: string;
    fields: QuestionnaireField[];
}

export type QuestionnaireField = {
    id: string;
    formId: string;
    fieldName: string;
    fieldType: string;
    fieldLabel: string;
}

export type RadioGroupQuestion = {
    id: string;
    groupLabel: string;
    options: Array<{
        label: string;
        value: string | number;
    }>
}