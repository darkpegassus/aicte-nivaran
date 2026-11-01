import React, { createContext, useContext, useState, useEffect } from 'react';
import apiClient from '../services/api';
import {
  mockInstitutions,
  mockComplaints,
  mockOverlaps,
  mockTimelineEvents,
  mockNotifications
} from '../data/mockData';

const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [institutions, setInstitutions] = useState(mockInstitutions);
  const [complaints, setComplaints] = useState(mockComplaints);
  const [overlaps, setOverlaps] = useState(mockOverlaps);
  const [timelineEvents, setTimelineEvents] = useState({
    'CMP-2025-0101': mockTimelineEvents[0].events
  });
  const [notifications, setNotifications] = useState(mockNotifications);
  const [isBackendConnected, setIsBackendConnected] = useState(false);

  // Poll FastAPI on mount; if available, swap mock data with live database records
  useEffect(() => {
    const fetchBackendData = async () => {
      try {
        const [instRes, cmpRes, ovlRes, notifRes] = await Promise.all([
          apiClient.get('/institutions'),
          apiClient.get('/complaints'),
          apiClient.get('/overlaps'),
          apiClient.get('/notifications')
        ]);

        if (instRes.data && cmpRes.data) {
          setInstitutions(instRes.data);
          setComplaints(cmpRes.data);
          setOverlaps(ovlRes.data || []);
          setNotifications(notifRes.data || []);
          setIsBackendConnected(true);
          console.log('Connected to AICTE NIVARAN FastAPI Backend.');
        }
      } catch (err) {
        console.warn('FastAPI backend not detected at localhost:8000. Running in standalone prototype mode.');
      }
    };

    fetchBackendData();
  }, []);

  // Actions
  const addInstitution = async (newInst) => {
    try {
      if (isBackendConnected) {
        const res = await apiClient.post('/institutions', newInst);
        setInstitutions(prev => [res.data, ...prev]);
        return;
      }
    } catch (e) {
      console.error('Failed to post to backend, writing locally:', e);
    }
    setInstitutions(prev => [newInst, ...prev]);
  };

  const addComplaint = async (newCmp) => {
    try {
      if (isBackendConnected) {
        const res = await apiClient.post('/complaints', newCmp);
        // Prepend so it is at the very top of the table
        setComplaints((prev) => [res.data, ...prev]);

        // Refresh overlaps and stats
        const ovlRes = await apiClient.get('/overlaps');
        if (ovlRes.data) setOverlaps(ovlRes.data);
        return res.data;
      }
    } catch (e) {
      console.error('Failed to post complaint to backend, writing locally:', e);
    }

    // Fallback: local prepend
    setComplaints((prev) => [newCmp, ...prev]);
    return newCmp;
  };

  const updateComplaintStatus = async (caseId, status) => {
    try {
      if (isBackendConnected) {
        await apiClient.patch(`/complaints/${caseId}/status`, { status });
      }
    } catch (e) {
      console.error(e);
    }
    setComplaints(prev =>
      prev.map(c => c.id === caseId ? { ...c, status, lastActionDate: new Date().toISOString().split('T')[0] } : c)
    );
  };

  const addTimelineEvent = async (caseId, event) => {
    try {
      if (isBackendConnected) {
        await apiClient.post(`/complaints/${caseId}/timeline`, event);
      }
    } catch (e) {
      console.error(e);
    }
    setTimelineEvents(prev => ({
      ...prev,
      [caseId]: [...(prev[caseId] || []), event]
    }));
  };

  const resolveOverlap = async (overlapId, actionTaken) => {
    try {
      if (isBackendConnected) {
        await apiClient.post(`/overlaps/${overlapId}/action`, { action: actionTaken });
      }
    } catch (e) {
      console.error(e);
    }
    setOverlaps(prev =>
      prev.map(o => o.id === overlapId ? { ...o, status: actionTaken } : o)
    );
  };

  const linkCases = (case1Id, case2Id) => {
    setComplaints(prev =>
      prev.map(c => {
        if (c.id === case1Id) return { ...c, overlappingCaseId: case2Id, status: 'Action Initiated' };
        if (c.id === case2Id) return { ...c, overlappingCaseId: case1Id, status: 'Action Initiated' };
        return c;
      })
    );
  };

  const markNotificationRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  return (
    <DataContext.Provider
      value={{
        institutions,
        complaints,
        overlaps,
        timelineEvents,
        notifications,
        isBackendConnected,
        addInstitution,
        addComplaint,
        updateComplaintStatus,
        addTimelineEvent,
        resolveOverlap,
        linkCases,
        markNotificationRead
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within DataProvider');
  return context;
};