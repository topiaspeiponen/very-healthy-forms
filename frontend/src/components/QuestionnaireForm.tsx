import { Button, Paper, Stack, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Questionnaire, QuestionnaireField } from "../utils/types.ts";
import InputRadioGroup from "./InputRadioGroup.tsx";
import styles from './questionnaire-form.module.css';
import InputText from "./InputText.tsx";
import { useMutation } from "@apollo/client";
import { CREATE_FORM_SUBMISSION } from "../utils/mutations.ts";


const generateZodSchema = (fields: QuestionnaireField[]) => {
    const schemaShape: Record<string, z.ZodTypeAny> = {};
    const radioNumberValidator = z.number().min(0, { message: 'Kenttä on pakollinen' });
    const textValidator = z.string().min(1, { message: 'Kenttä on pakollinen' });

    fields.forEach((field) => {
        let schema: z.ZodTypeAny;

        switch (field.fieldType) {
            case "RADIO_NUMBER":
                schema = radioNumberValidator;
                break;
            case "RADIO_NUMBER_REVERSE":
                schema = radioNumberValidator;
                break;
            case "TEXT":
                schema = textValidator;
                break;
            default:
                schema = z.string();
                break;
        }

        schemaShape[field.fieldName] = schema;
    });

    return z.object(schemaShape);
}

type QuestionnaireFormProps = {
    form: Questionnaire;
}

const initializeDefaultValues = (form: Questionnaire) => {
    const defaultValues = form.fields.reduce((acc, field) => {
        // Initialize non-string fields with -1 so that they are controlled from the start
        if (field.fieldType !== 'TEXT') acc[field.fieldName] = -1;
        else acc[field.fieldName] = '';
        return acc;
    }, {} as Record<string, string | number>);
    return defaultValues;
}

export default function QuestionnaireForm(props: QuestionnaireFormProps) {
    const { form } = props;
    const validationSchema = generateZodSchema(form.fields)

    const [createFormSubmission] = useMutation(CREATE_FORM_SUBMISSION);
    const {
        handleSubmit,
        control,
        reset
    } = useForm<Record<string, string | number>>(
        {
            resolver: zodResolver(validationSchema),
            defaultValues: initializeDefaultValues(form)
        });


    const submitForm = async (data: Record<string, number | string>) => {
        console.log(data);
        const input = {
            input: {
                formId: form.id,
                submitterName: data.name,
                submissionFields: Object.keys(data).map((key) => {
                    const field = form.fields.find(field => field.fieldName === key);
                    return {
                        formFieldId: field?.id,
                        name: key,
                        value: data[key].toString()
                    }
                }),
            }
        }
        console.log(input)
        try {
            console.log('trying to create')
            // Execute the mutation with input data
            const result = await createFormSubmission({
                variables: input,
            });
            reset();
            console.log('Form submitted successfully:', result);
        } catch (err) {
            console.error('Error submitting form:', err);
        }
    };

    const renderFormField = (field: QuestionnaireField) => {
        switch (field.fieldType) {
            case 'TEXT':
                return (
                    <InputText
                        name={field.fieldName}
                        label={field.fieldLabel}
                        control={control}
                        optionType="string"
                        key={field.id}
                    />
                )
            case 'RADIO_NUMBER':
                return (
                    <InputRadioGroup<Record<string, string | number>>
                        name={field.fieldName}
                        control={control}
                        optionType="number"
                        key={field.id}
                        question={{
                            id: field.id,
                            groupLabel: field.fieldLabel,
                            options: [0, 1, 2, 3, 4].map(num => {
                                return {
                                    label: num.toString(),
                                    value: num
                                }
                            })

                        }} />
                )
            case 'RADIO_NUMBER_REVERSE':
                return (
                    <InputRadioGroup<Record<string, string | number>>
                        name={field.fieldName}
                        control={control}
                        optionType="number"
                        key={field.id}
                        question={{
                            id: field.id,
                            groupLabel: field.fieldLabel,
                            options: [4, 3, 2, 1, 0].map(num => {
                                return {
                                    label: num.toString(),
                                    value: num
                                }
                            })

                        }} />
                )
            default:
                return null;
        }
    }

    return (
        <Paper className={styles['main-container']} elevation={4}>
            <Typography variant="h3" component="h1">
                {form.name} kysely
            </Typography>
            <form onSubmit={handleSubmit((data) => submitForm(data))}>
                <Stack>
                    {form.fields.map((field) => {
                        return renderFormField(field)
                    })}
                </Stack>
                <Button type="submit" variant="outlined">
                    Lähetä
                </Button>
            </form>
        </Paper>
    );
}