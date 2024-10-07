import { useParams } from "react-router-dom";
import { GET_SUBMISSION } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import { SubmissionResponse } from "../../utils/types";
import SubmissionView from "../../components/SubmissionView";
import NotFound from "../../components/NotFound";
import CircularProgress from "@mui/material/CircularProgress";


export default function ViewForm() {
  const { formId } = useParams<{ formId: string }>();
  const { loading, error, data } = useQuery<SubmissionResponse>(GET_SUBMISSION, {
    variables: { id: formId }
  });


  if (loading) return <CircularProgress thickness={5} />;
  if (error) return <NotFound text="Sivua ei löytynyt" />;
  if (!data?.submission) return <NotFound text="Kyselyn vastauksia ei löytynyt" />;

  return (
    <>
      <SubmissionView submission={data?.submission} />
    </>
  )
}