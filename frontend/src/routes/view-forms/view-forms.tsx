import { useQuery } from "@apollo/client";
import SubmissionsList from "../../components/SubmissionsList";
import { GET_SUBMISSIONS } from "../../utils/queries";
import { SubmissionsResponse } from "../../utils/types";
import CircularProgress from "@mui/material/CircularProgress";
import NotFound from "../../components/NotFound";


export default function ViewForms() {
  const { loading, error, data } = useQuery<SubmissionsResponse>(GET_SUBMISSIONS);

  if (loading) return <CircularProgress thickness={5} />;
  if (error) return <NotFound text="Kysely vastauksien hakemisessa tapahtui virhe" />;

  if (data?.submissions) {
    return (
    <>
      <SubmissionsList submissions={data?.submissions} />
    </>)
  }
  return (
    <div>no data</div>
  )
}