import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import issueService from '../../services/issue.service';

export default function CreateIssuePage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    motorcycle_id: '',
    description: '',
    issue_type: '',
    date_reported: '',
    status: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const res = await issueService.create({
      ...formData,
      motorcycle_id: Number(formData.motorcycle_id),
      date_reported: new Date(formData.date_reported),
    });

    if (res.status === 200 && res.data.id) {
      await issueService.send_issue_counter(res.data.id, 'POST');
      navigate('/issues/list');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 space-y-4">
      <h2 className="text-xl font-bold text-center">Crear nuevo issue</h2>
      {['motorcycle_id', 'description', 'issue_type', 'status'].map((field) => (
        <input
          key={field}
          type="text"
          name={field}
          value={(formData as any)[field]}
          onChange={handleChange}
          placeholder={field}
          className="w-full border px-3 py-2 rounded"
        />
      ))}

      <input
        type="datetime-local"
        name="date_reported"
        value={formData.date_reported}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
      />

      <button
        onClick={handleSubmit}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        Crear
      </button>
    </div>
  );
}
