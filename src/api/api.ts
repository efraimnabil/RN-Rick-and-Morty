import axios from 'axios';
import { PaginatedResponse } from '@/types/api';

const API_BASE_URL = 'https://rickandmortyapi.com/api';

const api = axios.create({ baseURL: API_BASE_URL });

interface FetchCharactersParams {
  pageParam?: number;
}

export const fetchCharacters = async ({ pageParam = 1 }: FetchCharactersParams): Promise<PaginatedResponse> => {
  const response = await api.get('/character', {
    params: { page: pageParam },
  });
  return response.data;
};