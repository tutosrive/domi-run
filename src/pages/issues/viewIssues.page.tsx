// src/pages/issues/viewIssue.page.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import issueService from '../../services/issue.service';
import Issue from '../../models/Issue.model';

export default function ViewIssuePage() {
  const { id } = useParams<{ id: string }>();
  const [issue, setIssue] = useState<Issue | null>(null);

  useEffect(() => {
    const fetch = async () => {
      const res = await issueService.get_by_id(Number(id));
      setIssue(res.data as Issue);
    };
    fetch();
  }, [id]);

  if (!issue) return <p>Cargando...</p>;

  return (
    <div className="max-w-lg mx-auto mt-10 space-y-2 text-lg">
      <h2 className="font-bold text-xl text-center">Detalles del Issue</h2>
      <p><strong>ID:</strong> {issue.id}</p>
      <p><strong>Motorcycle ID:</strong> {issue.motorcycle_id}</p>
      <p><strong>Descripción:</strong> {issue.description}</p>
      <p><strong>Tipo de Issue:</strong> {issue.issue_type}</p>
      <p>
        <strong>Fecha Reportada:</strong>{' '}
        {issue.date_reported
          ? new Date(issue.date_reported).toLocaleString()
          : ''}
      </p>
      <p><strong>Status:</strong> {issue.status}</p>
    </div>
  );
}
