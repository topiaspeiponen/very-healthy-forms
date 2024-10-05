import { FormsResponse, } from "../../utils/types.ts";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_FORMS } from "../../utils/queries.ts";
import QuestionnaireForm from "../../components/QuestionnaireForm.tsx";
import { CircularProgress } from "@mui/material";

export default function FillForm() {
  const { formSlug } = useParams<{ formSlug: string }>();
  const { loading, error, data } = useQuery<FormsResponse>(GET_FORMS, {
    variables: { slug: formSlug }
  });

  if (loading) return <CircularProgress thickness={5} />;

  // Handle error state
  if (error) return <div>Error loading form data.</div>;

  const questionnaireForm = data?.forms[0];

  return (
    <>
      {questionnaireForm ?
        <QuestionnaireForm form={questionnaireForm} />
        : <div> ei löydy </div>
      }
    </>
  )
}