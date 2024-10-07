
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Questionnaire, QuestionnaireField } from "../utils/types.ts";
import { useMutation } from "@apollo/client";
import { CREATE_FORM_SUBMISSION } from "../utils/mutations.ts";
import ArrowBack from "@mui/icons-material/ArrowBack";
import FormField from "./FormField.tsx";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";


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
        formState: { errors }
        //reset
    } = useForm<Record<string, string | number>>(
        {
            resolver: zodResolver(validationSchema),
            defaultValues: initializeDefaultValues(form)
        });


    const submitForm = async (data: Record<string, number | string>) => {
        const input = {
            input: {
                formId: form.id,
                submitterName: data.name,
                submissionFields: Object.keys(data).map((key) => {
                    const field = form.fields.find(field => field.fieldName === key);
                    return {
                        formFieldId: field?.id,
                        name: key,
                        value: data[key].toString(),
                    }
                }),
            }
        }

        try {
            const result = await createFormSubmission({
                variables: input,
            });
            console.log('Form submitted successfully:', result);
        } catch (err) {
            console.error('Error submitting form:', err);
        }
    };

    return (
        <Paper
            elevation={4}
            sx={{
                margin: '4rem 0',
                padding: '2rem',
                width: {
                    xs: 'fit-content',
                    md: '750px'
                }
            }}
        >
            <IconButton
                component={Link}
                sx={{ padding: 0, marginBottom: '1rem' }}
                color="primary"
                to="/">
                <ArrowBack />
            </IconButton>
            <Typography variant="h4" component="h1">
                {form.name} kysely
            </Typography>
            <form onSubmit={handleSubmit((data) => submitForm(data))}>
                <Stack
                    useFlexGap
                    sx={{
                        marginTop: '1rem',
                        marginBottom: '1rem',
                        gap: '1rem'
                    }}
                >
                    {form.fields.map((field, index) => {
                        return (
                            <FormField
                                key={field.id}
                                field={field}
                                isLastField={index === form.fields.length - 1}
                                control={control}
                                preview={false}
                            />)
                    })}
                </Stack>
                {Object.keys(errors).length > 0 && (
                    <Typography color="error" sx={{ marginBottom: '1rem' }}>
                        Lomakkeessa on virheitä, jotka on korjattava
                    </Typography>
                )}
                <Button type="submit" variant="contained">
                    Lähetä
                </Button>
            </form>
        </Paper>
    );
}