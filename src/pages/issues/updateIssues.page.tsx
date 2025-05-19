// src/pages/issues/updateIssue.page.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import issueService from '../../services/issue.service';
import Issue from '../../models/Issue.model';

export default function UpdateIssuePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [issue, setIssue] = useState<Issue | null>(null);

  useEffect(() => {
    const fetch = async () => {
      const res = await issueService.get_by_id(Number(id));
      setIssue(res.data as Issue);
    };
    fetch();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (issue) setIssue({ ...issue, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (issue) {
      const res = await issueService.update(issue.id!, issue);
      if (res.status === 200) {
        await issueService.send_issue_counter(issue.id!, 'PUT');
        navigate('/issues/list');
      }
    }
  };

  if (!issue) return <p>Cargando...</p>;

  return (
    <div className="max-w-lg mx-auto mt-10 space-y-4">
      <h2 className="text-xl font-bold text-center">Actualizar Issue</h2>
      {['motorcycle_id', 'description', 'issue_type', 'date_reported', 'status'].map((field) => (
        <input
          key={field}
          // use a date picker for the date_reported field
          type={field === 'date_reported' ? 'date' : 'text'}
          name={field}
          value={(issue as any)[field] ?? ''}
          onChange={handleChange}
          placeholder={field}
          className="w-full border px-3 py-2 rounded"
        />
      ))}
      <button
        onClick={handleSubmit}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        Guardar cambios
      </button>
    </div>
  );
}
