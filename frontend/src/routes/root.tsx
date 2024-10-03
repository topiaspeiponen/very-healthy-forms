import { Button, Paper } from '@mui/material';
import styles from './root.module.css';

export default function Root() {
    return (
      <Paper classes={styles.container} elevation={3} square>
        <h1> What to do?</h1>
        <div className="button-container">
          <Button
            href='/fill-form'
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