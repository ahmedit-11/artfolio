import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export const useInfiniteSearch = (searchType = 'projects') => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState('');

  const endpoint = searchType === 'users' ? '/search/users' : '/search/projects';

  const search = useCallback(async (searchQuery, page = 1, append = false) => {
    if (page === 1) {
      setLoading(true);
      setData([]);
    } else {
      setLoadingMore(true);
    }
    
    setError(null);

    try {
      const response = await axios.get(endpoint, {
        params: {
          keyword: searchQuery,
          page,
          per_page: 20
        }
      });

      const newData = response.data.data;
      
      if (append) {
        setData(prev => [...prev, ...newData]);
      } else {
        setData(newData);
      }
      
      setHasMore(response.data.current_page < response.data.last_page);
      setCurrentPage(response.data.current_page);
      
    } catch (err) {
      setError(err.response?.data?.message || 'Search failed');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [endpoint]);

  const loadMore = useCallback(() => {
    if (hasMore && !loadingMore && query) {
      search(query, currentPage + 1, true);
    }
  }, [hasMore, loadingMore, query, currentPage, search]);

  const newSearch = useCallback((searchQuery) => {
    setQuery(searchQuery);
    if (searchQuery.trim().length >= 3) {
      search(searchQuery, 1, false);
    } else {
      setData([]);
      setHasMore(false);
    }
  }, [search]);

  const clear = useCallback(() => {
    setData([]);
    setQuery('');
    setHasMore(false);
    setCurrentPage(1);
    setError(null);
  }, []);

  return {
    data,
    loading,
    loadingMore,
    error,
    hasMore,
    search: newSearch,
    loadMore,
    clear
  };
};
