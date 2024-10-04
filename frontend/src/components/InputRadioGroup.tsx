import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, FormHelperText } from "@mui/material";
import { RadioGroupQuestion } from "../utils/types";
import { Control, Controller, Path } from "react-hook-form";

type InputRadioGroupProps<T extends Record<string, string | number>> = {
    name: Path<T>;
    control: Control<T, number>;
    question: RadioGroupQuestion;
    optionType: 'string' | 'number';
    background?: 'light' | 'dark';
}

export default function InputRadioGroup<T extends Record<string, string | number>>(props: InputRadioGroupProps<T>) {
    const { name, control, optionType, question } = props;
    return (
        <FormControl component="fieldset" required>
            <FormLabel component="legend">{question.groupLabel}</FormLabel>
            <Controller
                name={name}
                control={control}
                render={({
                    field: { onChange, value },
                    fieldState: { error },
                }) => (
                    <>
                        <RadioGroup
                            value={value}
                            onChange={
                                (_e, value) => {
                                    if (optionType === 'number') {
                                        const parsedValue = parseInt(value);
                                        return onChange(parsedValue)
                                    }
                                    return onChange(value)
                                }
                            }
                            row
                        >
                            {question.options.map((option) => {
                                return (
                                    <FormControlLabel
                                        key={`form-control-label-${option.value}-${question.id}`}
                                        value={option.value}
                                        control={<Radio />}
                                        label={option.label}
                                    />
                                )
                            })}
                        </RadioGroup>
                        {error?.message && <FormHelperText>{error.message}</FormHelperText>}
                    </>
                )}
            />

        </FormControl>
    )
};