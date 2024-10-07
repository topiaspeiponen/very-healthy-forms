import { useQuery } from '@apollo/client';
import { FormsResponse } from '../utils/types';
import { GET_FORMS } from '../utils/queries';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import NotFound from '../components/NotFound';


export default function Root() {
  const { loading, error, data } = useQuery<FormsResponse>(GET_FORMS);

  if (loading) return <CircularProgress thickness={5} />;
  //if (error) return <NotFound text="Lomakkeiden hakemisessa tapahtui virhe" />;

  return (
    <Paper sx={{ padding: '1rem' }} elevation={3} square>
      <h1> What to do?</h1>
      <div>
        {data && (
        <Button
          component={Link}
          to={`/fill-form/${data.forms[0].slug}`}
          variant='outlined'>
          Täytä lomake
        </Button>
        )}
        <Button
          component={Link}
          to='/view-forms'
          variant='outlined'>
          Tarkastele lomakkeita
        </Button>
      </div>
    </Paper>
  );
}