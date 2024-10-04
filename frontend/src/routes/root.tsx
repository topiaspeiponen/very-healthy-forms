import { Button, Paper } from '@mui/material';
import styles from './root.module.css';
import { useQuery } from '@apollo/client';
import { FormsResponse } from '../utils/types';
import { GET_FORMS } from '../utils/queries';

export default function Root() {
  const { loading, error, data } = useQuery<FormsResponse>(GET_FORMS);

  if (loading) return 'Loading saatana';
  if (error) return 'Error perkele';
  console.log('Data ', data);

  return (
    <Paper classes={styles.container} elevation={3} square>
      <h1> What to do?</h1>
      <div className="button-container">
        <Button
          href={`/fill-form/${data!.forms[0].slug}`}
          variant='outlined'>
          Täytä lomake
        </Button>
        <Button
          href='/view-forms'
          variant='outlined'>
          Tarkastele lomakkeita
        </Button>
      </div>
    </Paper>
  );
}