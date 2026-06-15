import { useState, useEffect, useCallback } from 'react';
import api from '../api/axios';

export function useStudents(page, limit = 6) {
  const [students, setStudents] = useState([]);
  const [meta, setMeta]         = useState({});
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  const fetchStudents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.get(`/students?page=${page}&limit=${limit}`);
      setStudents(data.data);
      setMeta(data);
    } catch (err) {
      setError(err.userMessage || 'Failed to load students.');
    } finally {
      setLoading(false);
    }
  }, [page, limit]);

  useEffect(() => { fetchStudents(); }, [fetchStudents]);

  return { students, meta, loading, error, refetch: fetchStudents };
}

export function useStudent(id) {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  const fetchStudent = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.get(`/students/${id}`);
      setStudent(data);
    } catch (err) {
      setError(err.userMessage || 'Student not found.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => { fetchStudent(); }, [fetchStudent]);

  return { student, loading, error, refetch: fetchStudent };
}