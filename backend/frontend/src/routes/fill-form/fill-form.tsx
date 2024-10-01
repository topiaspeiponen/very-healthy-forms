import { Button, Paper, Stack, Typography } from "@mui/material";
import styles from './fill-form.module.css';
import InputRadioGroup from "../../components/InputRadioGroup";
import core10questions from '../../utils/core10questions.ts';
import { useForm } from "react-hook-form";
import { Core10Form } from "../../utils/types.ts";

export default function FillForm() {
  // Form default values have to default to something other than undefined
  // in order to preserve the controlled state throughout input lifecycle
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors }
  } = useForm<Core10Form>(
    {
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

  return (
    <Paper className={styles['main-container']} elevation={4}>
      <Typography variant="h3" component="h1">
        CORE-10 kysely
      </Typography>
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <Stack>
          {core10questions.map((question) => {
            return (
              <InputRadioGroup<Core10Form> name={question.id.toString() as keyof Core10Form} control={control} key={question.id} question={question} />
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