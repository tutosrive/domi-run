import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TableDataPrimeComponent, { type DataTableObject } from '../../components/TableDataPrime.component';
import LoaderPointsComponent from '../../components/LoaderPoints.component.tsx';
import Issue from '../../models/Issue.model';
import issueService from '../../services/issue.service';
import type ReturningService from '../../models/ReturningService.model';

export default function IssuesPage() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const navigate = useNavigate();

  const getIssues = async () => {
    const resIssues: ReturningService = await issueService.get_all();
    const rawData = resIssues.data;
    const raw: any[] = Array.isArray(rawData) ? rawData : [];
    const data: Issue[] = raw.map(item =>
      new Issue(
        item.id,
        item.motorcycle_id,
        item.description,
        item.issue_type,
        new Date(item.date_reported),
        item.status
      )
    );
    setIssues(data);
  };

  useEffect(() => {
    getIssues();
  }, []);

  const removeIssue = async (id: string | number) => {
    await issueService.delete(Number(id));
    await getIssues();
  };

  // Preparamos las filas de la tabla, formateando la fecha a string
  const tableRows = issues.map(issue => ({
    ...issue,
    date_reported: issue.date_reported
      ? issue.date_reported.toLocaleDateString()
      : ''  // fallback si por alguna razón es undefined
  }));

  const dataTable: DataTableObject = {
    arrayData: tableRows,
    headerTable: <p>Issues</p>,
  };

  return (
    <>
      <div className="text-center mb-2">
        <h1>Issues</h1>
      </div>
      <div className="flex justify-center">
        {issues.length > 0 ? (
          <TableDataPrimeComponent
            data={dataTable}
            navigation={{
              navigate,
              urls: {
                create: '/issues/create',
                update: '/issues/update',
                view: '/issues/view',
              },
            }}
            onRemove={removeIssue}
          />
        ) : (
          <div className="w-screen h-screen fixed top-1/2">
            <LoaderPointsComponent />
          </div>
        )}
      </div>
    </>
  );
}
