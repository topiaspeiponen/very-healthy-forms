import { FormsResponse, } from "../../utils/types.ts";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_FORMS } from "../../utils/queries.ts";
import QuestionnaireForm from "../../components/QuestionnaireForm.tsx";
import CircularProgress from "@mui/material/CircularProgress";
import NotFound from "../../components/NotFound.tsx";

export default function FillForm() {
  const { formSlug } = useParams<{ formSlug: string }>();
  const { loading, error, data } = useQuery<FormsResponse>(GET_FORMS, {
    variables: { slug: formSlug }
  });

  const questionnaireForm = data?.forms[0];

  if (loading) return <CircularProgress thickness={5} />;
  if (error) return <NotFound text="Kyselyn vastauksien hakemisessa tapahtui virhe" />;
  if (!questionnaireForm) return <NotFound text="Kyselyn vastauksia ei löytynyt" />;

  return (
    <>
      <QuestionnaireForm form={questionnaireForm} />
    </>
  )
}