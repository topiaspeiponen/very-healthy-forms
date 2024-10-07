import { useQuery } from '@apollo/client';
import { FormsResponse } from '../utils/types';
import { GET_FORMS } from '../utils/queries';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


export default function Root() {
  const { loading, data } = useQuery<FormsResponse>(GET_FORMS);

  if (loading) return <CircularProgress thickness={5} />;

  return (
    <Paper sx={{ padding: '2rem', textAlign: 'center' }} elevation={3} square>
      <Typography variant="h4">VeryHealthyForms</Typography>
      <Box sx={{ marginTop: '2rem', display: 'flex', flexDirection: 'row', gap: '1rem' }}>
        {data && (
        <Button
          component={Link}
          to={`/fill-form/${data.forms[0].slug}`}
          variant="contained">
          Täytä lomake
        </Button>
        )}
        <Button
          component={Link}
          to='/view-forms'
          variant="contained">
          Tarkastele lomakkeita
        </Button>
      </Box>
    </Paper>
  );
}