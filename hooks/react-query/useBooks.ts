import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useBooks = (query: string) => {
  return useQuery({
    queryKey: ['books', query],
    queryFn: async () => {
      const res = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${query}`
      );
      return res.data.items;
    },
    enabled: !!query, 
  });
};

export const useBook = (id: string) => {
  return useQuery({
    queryKey: ['book', id],
    queryFn: async () => {
      const res = await axios.get(
        `https://www.googleapis.com/books/v1/volumes/${id}`
      );
      return res.data;
    },
    enabled: !!id, 
  });
};
