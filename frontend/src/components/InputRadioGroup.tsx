import FormControl from "@mui/material/FormControl";
import { RadioGroupQuestion } from "../utils/types";
import { Control, Controller, Path } from "react-hook-form";
import Grid2 from "@mui/material/Grid2";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import FormHelperText from "@mui/material/FormHelperText";

type InputRadioGroupProps<T extends Record<string, string | number>> = {
    name: Path<T>;
    control: Control<T, number>;
    question: RadioGroupQuestion;
    optionType: 'string' | 'number';
    preview: boolean;
}

export default function InputRadioGroup<T extends Record<string, string | number>>(props: InputRadioGroupProps<T>) {
    const { name, control, optionType, question, preview } = props;
    return (
        <FormControl
            component="fieldset"
            required
            disabled={preview}
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
                                            label={preview ? `${option.label} (${option.value})` : option.label}
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