import { gql } from "graphql-tag";

const EXECUTE_PAY = gql`
  mutation EXECUTE_PAY($info: [PayInfo!]!) {
    executePay(info: $info) {
      id
      amount
    }
  }
`;
export default EXECUTE_PAY;
