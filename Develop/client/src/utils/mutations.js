import { gql } from '@apollo/client';

export const SAVE_BOOK = gql`
  mutation saveBook($userId: ID!, $bookId: ID!, $authors: string, $description: string, $title: string) {
    saveBook($userId: ID!, $bookId: ID!, $authors: string, $description: string, $title: string) {
      _id
      email
      books
      username
    }
  
    
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String, $password: String!, $email: String) {
    addUser(username: $username, password: $password: String, email: $email:) {
    token 
      user {
      _id
      username
      email
    }
  }
}
`;

export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      _id
      username
    email
    }
  }
}
`;

export const REMOVE_BOOK = gql`
  mutation romoveBook($bookId: String!) {
    removeSkill(bookId: $bookId) {
      _id
      username
      books
      email
      
    }
  }
`;