import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, FormHelperText, Grid2 } from "@mui/material";
import { RadioGroupQuestion } from "../utils/types";
import { Control, Controller, Path } from "react-hook-form";

type InputRadioGroupProps<T extends Record<string, string | number>> = {
    name: Path<T>;
    control: Control<T, number>;
    question: RadioGroupQuestion;
    optionType: 'string' | 'number';
}

export default function InputRadioGroup<T extends Record<string, string | number>>(props: InputRadioGroupProps<T>) {
    const { name, control, optionType, question } = props;
    return (
        <FormControl
            component="fieldset"
            required
            sx={{
                display: 'flex',
                flexDirection: 'row'
            }}
        >
            <Grid2 sx={{ width: '100%' }} container spacing={2}>
                <Grid2 size={6}>
                <FormLabel component="legend">{question.groupLabel}</FormLabel>
                </Grid2>
                <Controller
                    name={name}
                    control={control}
                    render={({
                        field: { onChange, value },
                        fieldState: { error },
                    }) => (
                        
                        <Grid2 size={6}>
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
                            {error?.message && <FormHelperText error>{error.message}</FormHelperText>}
                        
                        </Grid2>
                    )}
                />
            </Grid2>
        </FormControl>
    )
};