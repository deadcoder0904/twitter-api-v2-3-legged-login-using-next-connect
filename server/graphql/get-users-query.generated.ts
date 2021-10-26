import * as Types from '../../client/graphql/types.generated';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetUsersQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', currentUser?: { __typename: 'User', id?: string | null | undefined, name?: string | null | undefined, username?: string | null | undefined, email?: string | null | undefined } | null | undefined };


export const GetUsersDocument = gql`
    query GetUsers {
  currentUser {
    __typename
    id
    name
    username
    email
  }
}
    `;

export function useGetUsersQuery(options: Omit<Urql.UseQueryArgs<GetUsersQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetUsersQuery>({ query: GetUsersDocument, ...options });
};