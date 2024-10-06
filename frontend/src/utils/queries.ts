import { gql } from '@apollo/client';

export const GET_FORMS = gql`
  query {
    forms {
      id
      name
      slug
      fields {
        fieldLabel
        fieldName
        fieldType
        formId
        id
      }
    }
  }
`;

export const GET_SUBMISSIONS = gql`
  query {
    submissions {
      created
      formId
      id
      submitterName
      score
      form {
        name
        slug
      }
      submissionFields {
          formFieldId
          formSubmissionId
          id
          name
          value
        }
    }
  }
`;

export const GET_SUBMISSION = gql`
  query Submission($id: UUID!) {
    submission(id: $id) {
      created
      formId
      id
      submitterName
      score
      form {
        name
        slug
        fields {
          fieldLabel
          fieldName
          fieldType
          formId
          id
        }
      }
      submissionFields {
        formFieldId
        formSubmissionId
        id
        name
        value
      }
    }
  }
`;