import { useQuery } from "@apollo/client";
import SubmissionsList from "../../components/SubmissionsList";
import { GET_SUBMISSIONS } from "../../utils/queries";
import { SubmissionsResponse } from "../../utils/types";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect } from "react";


export default function ViewForms() {
  const { loading, error, data, refetch } = useQuery<SubmissionsResponse>(GET_SUBMISSIONS);

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (loading) return <CircularProgress thickness={5} />;

  return (
    <>
      <SubmissionsList
        submissions={data?.submissions || []}
        fetchError={error !== undefined}/>
    </>)
}