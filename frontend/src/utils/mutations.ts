import { gql } from "@apollo/client";

export const CREATE_FORM_SUBMISSION = gql`
mutation CreateFormSubmission($input: CreateFormSubmissionInput!) {
 createForm(input: $input) {
   formId
   submitterName
   submissionFields {
     formFieldId
     name
     value
   }
 }
}
`;