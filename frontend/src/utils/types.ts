export type FormsResponse = {
    forms: Questionnaire[];
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

export type Core10Form = {
    "1": number;
    "2": number;
    "3": number;
    "4": number;
    "5": number;
    "6": number;
    "7": number;
    "8": number;
    "9": number;
    "10": number;
}

export type RadioGroupQuestion = {
    id: string;
    groupLabel: string;
    options: Array<{
        label: string;
        value: string | number;
    }>
}