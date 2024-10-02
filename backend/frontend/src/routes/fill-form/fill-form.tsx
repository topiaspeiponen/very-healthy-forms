import { Button, Paper, Stack, Typography } from "@mui/material";
import styles from './fill-form.module.css';
import InputRadioGroup from "../../components/InputRadioGroup";
import core10questions from '../../utils/core10questions.ts';
import { useForm } from "react-hook-form";
import { Core10Form } from "../../utils/types.ts";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const core10FieldValidator = z.number().min(0, { message: 'Kenttä on pakollinen' });
const formValidationSchema = z.object({
  "1": core10FieldValidator,
  "2": core10FieldValidator,
  "3": core10FieldValidator,
  "4": core10FieldValidator,
  "5": core10FieldValidator,
  "6": core10FieldValidator,
  "7": core10FieldValidator,
  "8": core10FieldValidator,
  "9": core10FieldValidator,
  "10": core10FieldValidator,
})

export default function FillForm() {
  // Form default values have to default to something other than undefined
  // in order to preserve the controlled state throughout input lifecycle
  const {
    handleSubmit,
    control,
  } = useForm<Core10Form>(
    {
      resolver: zodResolver(formValidationSchema),
      defaultValues: {
        "1": -1,
        "2": -1,
        "3": -1,
        "4": -1,
        "5": -1,
        "6": -1,
        "7": -1,
        "8": -1,
        "9": -1,
        "10": -1
      }
    });

  const submitForm = (form: Core10Form) => {
    console.log(form)
  };

  return (
    <Paper className={styles['main-container']} elevation={4}>
      <Typography variant="h3" component="h1">
        CORE-10 kysely
      </Typography>
      <form onSubmit={handleSubmit((data) => submitForm(data))}>
        <Stack>
          {core10questions.map((question) => {
            return (
              <InputRadioGroup<Core10Form>
                name={question.id.toString() as keyof Core10Form}
                control={control}
                optionType="number"
                key={question.id}
                question={question} />
            )
          })}
        </Stack>
        <Button type="submit" variant="outlined">
          Lähetä
        </Button>
      </form>
    </Paper>
  );
}