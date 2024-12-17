import { mutate } from 'swr';
import axios from 'axios';

const URL = import.meta.env.VITE_APP_API_URL;

export const endpoints = {
  key: '/api/personas',
  uploadUsers: '/upload-xlsx-users',
  uploadBooks: '/upload-xlsx',

  keyBooks: '/api/booksget',
  listBooks: '/all',

  keyUsers: '/api/usuarios',
  listUsers: '/getAllUsuariosCedhi'
};


// UPLOAD BOOKS

export async function uploadBook(newBooksFile) {
  const serviceToken = window.localStorage.getItem('serviceToken');
  try {
    if (!serviceToken) return;
    const response = await axios.post(URL + endpoints.key + endpoints.uploadBooks, newBooksFile, {
      headers: { authorization: serviceToken }
    });
    mutate(endpoints.key + endpoints.list);
    mutate(endpoints.keyBooks + endpoints.listBooks);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}



// UPLOAD USERS

export async function uploadUsers(newUsersFile) {
  const serviceToken = window.localStorage.getItem('serviceToken');
  try {
    if (!serviceToken) return;
    const response = await axios.post(URL + endpoints.key + endpoints.uploadUsers, newUsersFile, {
      headers: { authorization: serviceToken }
    });
    mutate(endpoints.key + endpoints.list);
    mutate(endpoints.keyUsers + endpoints.listUsers);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}
