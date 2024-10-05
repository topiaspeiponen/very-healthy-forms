import { useQuery } from "@apollo/client";
import SubmissionsList from "../../components/SubmissionsList";
import { GET_SUBMISSIONS } from "../../utils/queries";
import { SubmissionsResponse } from "../../utils/types";
import { CircularProgress } from "@mui/material";

export default function ViewForms() {
  const { loading, error, data } = useQuery<SubmissionsResponse>(GET_SUBMISSIONS);

  if (loading) return <CircularProgress thickness={5} />;

  // Handle error state
  if (error) return <div>Error loading form data.</div>;

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