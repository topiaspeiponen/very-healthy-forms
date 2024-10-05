import TextField from "@mui/material/TextField";
import { Control, Controller, Path } from "react-hook-form";

type InputTextProps<T extends Record<string, string | number>> = {
    name: Path<T>;
    label: string;
    control: Control<T, string>;
}

export default function InputText(props: InputTextProps<Record<string, string | number>>) {
    const { name, label, control } = props;

    return (
        <Controller
            name={name}
            control={control}
            render={({
                field: { onChange, value },
                fieldState: { error },
            }) => (
                <TextField
                    helperText={error ? error.message : null}
                    size="small"
                    error={!!error}
                    onChange={onChange}
                    value={value}
                    fullWidth
                    label={label}
                    variant="outlined"
                />
            )}
        />
    )
}