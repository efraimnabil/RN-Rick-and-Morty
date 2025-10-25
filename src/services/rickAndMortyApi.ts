import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Character, PaginatedResponse } from '@/types/api';

export const rickAndMortyApi = createApi({
  reducerPath: 'rickAndMortyApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://rickandmortyapi.com/api/' }),
  endpoints: (builder) => ({
    getCharacters: builder.query<PaginatedResponse, number>({
      query: (page = 1) => `character?page=${page}`,
      // Only have one cache entry because the arg always maps to the same string
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      // Always merge incoming data to the cache entry
      merge: (currentCache, newItems) => {
        currentCache.info = newItems.info;
        // Prevent duplicates by checking if character already exists
        const existingIds = new Set(currentCache.results.map(char => char.id));
        const uniqueNewItems = newItems.results.filter(char => !existingIds.has(char.id));
        currentCache.results.push(...uniqueNewItems);
      },
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
  }),
});

export const { useGetCharactersQuery } = rickAndMortyApi;