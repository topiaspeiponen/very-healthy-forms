import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, FormHelperText } from "@mui/material";
import { Core10Form, RadioGroupQuestion } from "../utils/types";
import { Control, Controller, Path } from "react-hook-form";

type InputRadioGroupProps<T extends Record<string, number>> = {
    name: Path<T>;
    control: Control<T, any>;
    question: RadioGroupQuestion;
    background?: 'light' | 'dark';
}

export default function InputRadioGroup<T extends Record<string, number>>(props: InputRadioGroupProps<T>) {
    const { name, control, question } = props;
    return (
        <FormControl component="fieldset" required>
            <FormLabel component="legend" id="demo-row-radio-buttons-group-label">{question.groupLabel}</FormLabel>
            <Controller
                name={name}
                control={control}
                render={({
                    field: { onChange, value },
                    fieldState: { error },
                    formState,
                    }) => (
                    <RadioGroup
                        value={value}
                        onChange={onChange}
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
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
                )}
            />
        </FormControl>
    )
};