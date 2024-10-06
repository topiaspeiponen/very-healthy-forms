import Divider from "@mui/material/Divider";
import { QuestionnaireField } from "../utils/types";
import InputText from "./InputText";
import { Fragment } from "react/jsx-runtime";
import InputRadioGroup from "./InputRadioGroup";
import { Control } from "react-hook-form";

type RenderFormFieldProps = {
    field: QuestionnaireField;
    isLastField: boolean;
    control: Control<Record<string, string | number>, any>,
    preview: boolean;
}

export default function renderFormField(props: RenderFormFieldProps) {
    const { field, isLastField, control, preview } = props;

    switch (field.fieldType) {
        case 'TEXT':
            return (
                <InputText
                    name={field.fieldName}
                    label={field.fieldLabel}
                    control={control}
                    key={field.id}
                    preview={preview}
                />
            )
        case 'RADIO_NUMBER':
            const radioNumberFieldOptions = [
                {
                    label: 'Ei lainkaan',
                    value: 0
                },
                {
                    label: 'Vain satunnaisesti',
                    value: 1
                },
                {
                    label: 'Toisinaan',
                    value: 2
                },
                {
                    label: 'Usein',
                    value: 3
                },
                {
                    label: 'Enimmäkseen tai koko ajan',
                    value: 4
                },
            ];
            return (
                <Fragment key={field.id}>
                    <InputRadioGroup<Record<string, string | number>>
                        name={field.fieldName}
                        control={control}
                        optionType="number"
                        preview={preview}
                        question={{
                            id: field.id,
                            groupLabel: `${field.fieldName}. ${field.fieldLabel}`,
                            options: radioNumberFieldOptions
                        }} />
                    {!isLastField && (<Divider />)}
                </Fragment>
            )
        case 'RADIO_NUMBER_REVERSE':
            const radioNumberReverseFieldOptions = [
                {
                    label: 'Ei lainkaan',
                    value: 4
                },
                {
                    label: 'Vain satunnaisesti',
                    value: 3
                },
                {
                    label: 'Toisinaan',
                    value: 2
                },
                {
                    label: 'Usein',
                    value: 1
                },
                {
                    label: 'Enimmäkseen tai koko ajan',
                    value: 0
                },
            ];
            return (
                <Fragment key={field.id}>
                    <InputRadioGroup<Record<string, string | number>>
                        name={field.fieldName}
                        control={control}
                        optionType="number"
                        preview={preview}
                        question={{
                            id: field.id,
                            groupLabel: `${field.fieldName}. ${field.fieldLabel}`,
                            options: radioNumberReverseFieldOptions
                        }} />
                    {!isLastField && (<Divider />)}
                </Fragment>
            )
        default:
            return null;
    }
}