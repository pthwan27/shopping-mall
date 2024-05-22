import { gql } from "graphql-tag";

const EXECUTE_PAY = gql`
  type PayItem {
    id: string!
    amount: Int!
  }

  mutation EXECUTE_PAY($info: [PayItems]) {
    pay(PayItems: $info)
  }
`;
export default EXECUTE_PAY;
