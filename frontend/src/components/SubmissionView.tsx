import { useForm } from "react-hook-form";
import { Submission, SubmissionField } from "../utils/types";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import ArrowBack from "@mui/icons-material/ArrowBack";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import FormField from "./FormField";
import { Link } from "react-router-dom";

type SubmissionViewProps = {
    submission: Submission
}

export default function SubmissionView(props: SubmissionViewProps) {
    const { submission } = props;

    const initializeDefaultValues = (fields: SubmissionField[]) => {
        const defaultValues : Record<string, string> = {};
        fields.forEach((field) => {
            defaultValues[field.name] = field.value;
        })
        return defaultValues;
    };

    const {
        control,
    } = useForm<Record<string, string | number>>(
        {
            defaultValues: initializeDefaultValues(submission.submissionFields)
        });

  
  return (
      <Paper
          elevation={4}
          sx={{
              margin: '4rem 0',
              padding: '2rem',
              width:  {
                  xs: 'fit-content',
                  md: '750px'
              }
          }}
      >
          <IconButton
            component={Link}
            sx={{ padding: 0, marginBottom: '1rem'}}
            color="primary"
            to="/view-forms">
              <ArrowBack />
              <Typography>
                Takaisin
              </Typography>
          </IconButton>
          <Typography variant="h4" component="h1">
              {submission.form.name} kysely
          </Typography>
          <Typography component="p">
              Yhteispisteet: {submission.score}
          </Typography>
              <Stack
                  useFlexGap
                  sx={{
                      marginTop: '1rem',
                      marginBottom: '1rem',
                      gap: '1rem'
                  }}
              >
                  {submission.form.fields.map((field, index) => {
                      return (
                          <FormField
                              preview 
                              field={field}
                              isLastField={index === submission.form.fields.length-1}
                              control={control}
                          />)
                  })}
              </Stack>
      </Paper>
  );
}