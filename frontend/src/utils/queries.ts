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