import { useParams } from "react-router-dom";


export default function SubmissionView() {
  const { formId } = useParams<{ formId: string }>();

    return (
        <div>
            {formId}
        </div>
    )
}