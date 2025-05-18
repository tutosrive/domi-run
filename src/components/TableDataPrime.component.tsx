import React, { Component, type JSX } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toolbar } from 'primereact/toolbar';
import { Ripple } from 'primereact/ripple';
import DialogConfirmComponent from './dialogConfirm.component';
import ActionsButtonsComponent from './actionsButtons.component';
import type { NavigateFunction } from 'react-router-dom';

/**
 * Props for table configuration and data
 */
export interface DataTableObject {
  arrayData: any[];
  templatesAdditionalColumns?: { start?: JSX.Element[]; end?: JSX.Element[] };
  headerTable?: string | JSX.Element;
  sortable?: boolean;
  toolbar?: { start?: JSX.Element; center?: JSX.Element; end?: JSX.Element };
  scrollHeight?: string;
}

/**
 * Props for TablePrime component:
 * - data: table configuration and dataset
 * - navigation: navigation function and URL templates for actions
 * - onCreate: optional callback to create a new record
 * - onRemove: optional callback to remove a record by ID
 */
export interface TablePrimeProps {
  data: DataTableObject;
  navigation: {
    navigate: NavigateFunction;
    urls: {
      update?: string;
      view?: string;
      create?: string;
    };
  };
  onCreate?: () => void;
  onRemove?: (id: string | number) => Promise<any>;
  globalFilter?: string[];
}

/**
 * State of TablePrime component:
 * - records: current table rows
 * - dialogExportVisible: whether export confirmation is shown
 * - dialogRemoveVisible: whether remove confirmation is shown
 * - rowToRemove: record selected for removal
 * - removeTemplate: JSX template displaying row details
 */
export interface TablePrimeState {
  records: any[];
  dialogExportVisible: boolean;
  dialogRemoveVisible: boolean;
  rowToRemove: Record<string, any> | null;
  removeTemplate: JSX.Element | null;
  props: TablePrimeProps;
}

export class TablePrime extends Component<TablePrimeProps, TablePrimeState> {
  private tableRef?: DataTable<any>;

  constructor(props: TablePrimeProps) {
    super(props);
    this.state = {
      records: props.data.arrayData,
      dialogExportVisible: false,
      dialogRemoveVisible: false,
      rowToRemove: null,
      removeTemplate: null,
      props: props,
    };
  }

  /**
   * Show export confirmation dialog
   */
  showConfirmExport = () => this.setState({ dialogExportVisible: true });

  /**
   * Hide export confirmation dialog
   */
  hideConfirmExport = () => this.setState({ dialogExportVisible: false });

  /**
   * Trigger CSV export on the table and close dialog
   */
  onConfirmExport = () => {
    this.tableRef?.exportCSV();
    this.hideConfirmExport();
  };

  /**
   * Build a modern mini-table template showing the record details
   */
  buildRemoveTemplate = (row: Record<string, any>): JSX.Element => (
    <>
      <h2 className="text-lg font-semibold mb-2 sticky">You are about to delete:</h2>
      <div className="overflow-auto border rounded-lg shadow-sm p-2 text-left bg-white dark:bg-gray-800 h-[35vh]">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-2 py-1 text-left font-medium text-gray-600 dark:text-gray-300">Field</th>
              <th className="px-2 py-1 text-left font-medium text-gray-600 dark:text-gray-300">Value</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-600">
            {Object.entries(row).map(([key, val], idx) => (
              <tr key={key} className={idx % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700'}>
                <td className="px-2 py-1 align-top font-semibold text-gray-700 dark:text-gray-200">{key}</td>
                <td className="px-2 py-1 text-gray-900 dark:text-gray-100">{String(val)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );

  /**
   * Show remove confirmation dialog
   */
  showConfirmRemove = () => this.setState({ dialogRemoveVisible: true });

  /**
   * Hide remove confirmation dialog
   */
  hideConfirmRemove = () => this.setState({ dialogRemoveVisible: false });

  /**
   * Confirm removal: invoke callback, remove from state, and close dialog
   */
  onConfirmRemove = async () => {
    const { rowToRemove, records } = this.state;
    this.hideConfirmRemove();
    if (rowToRemove && this.props.onRemove) {
      await this.props.onRemove(rowToRemove.id);
    }
    // Remove locally for reactive update
    if (rowToRemove) {
      this.setState({ records: records.filter((r) => r.id !== rowToRemove.id) });
    }
  };

  /**
   * Handle edit action: navigate to edit URL
   */
  handleEdit = (id: string | number) => {
    const { navigate, urls } = this.props.navigation;
    if (urls.update) navigate(`${urls.update}/${id}`);
  };

  /**
   * Handle view action: navigate to view URL
   */
  handleView = (id: string | number) => {
    const { navigate, urls } = this.props.navigation;
    if (urls.view) navigate(`${urls.view}/${id}`);
  };

  /**
   * Handle remove action: prepare template and show dialog
   */
  handleRemove = (row: Record<string, any>) => {
    const tpl = this.buildRemoveTemplate(row);
    this.setState({ rowToRemove: row, removeTemplate: tpl }, this.showConfirmRemove);
  };

  /**
   * Generate dynamic columns based on record keys
   */
  createColumns() {
    const { records } = this.state;
    const { sortable } = this.props.data;
    if (!records?.length) return null;
    let keys = Object.keys(records[0]);
    if (keys.includes('id')) keys = ['id', ...keys.filter((k) => k !== 'id')];
    return keys.map((key) => <Column key={key} field={key} header={key.charAt(0).toUpperCase() + key.slice(1)} sortable={sortable ?? true} />);
  }

  /**
   * Column containing action buttons for each row
   */
  actionColumn() {
    return <Column key="actions" header="Actions" body={(rowData) => <ActionsButtonsComponent handleEdit={() => this.handleEdit(rowData.id)} handleView={() => this.handleView(rowData.id)} handleRemove={() => this.handleRemove(rowData)} />} style={{ width: '150px', textAlign: 'center' }} />;
  }

  render() {
    const { data, navigation, onCreate } = this.props;
    const { records, dialogExportVisible, dialogRemoveVisible, removeTemplate } = this.state;

    return (
      <div className="w-[90vw]">
        <Toolbar
          start={
            <button
              className="btn green-ripple p-ripple"
              onClick={() => {
                if (onCreate) onCreate();
                else if (navigation.urls.create) navigation.navigate(navigation.urls.create);
              }}
            >
              Create
              <Ripple />
            </button>
          }
          center={data.toolbar?.center}
          end={
            data.toolbar?.end ?? (
              <button className="btn orange-ripple p-ripple" onClick={this.showConfirmExport}>
                Export
                <Ripple />
              </button>
            )
          }
        />

        <DataTable
          ref={(el) => (this.tableRef = el!)}
          value={records}
          header={data.headerTable ?? 'Data Table'}
          dataKey="id"
          scrollable
          scrollHeight={data.scrollHeight ?? '50vh'}
          paginator
          rows={10}
          stripedRows
          rowsPerPageOptions={[5, 10, 25, 50]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="{first}/{last} | Total: {totalRecords}"
        >
          {this.actionColumn()}
          {this.createColumns()}
          {data.templatesAdditionalColumns?.end}
        </DataTable>

        {/* Export confirmation dialog */}
        <DialogConfirmComponent visible={dialogExportVisible} message="Do you really want to export the table data?" handleOk={this.onConfirmExport} handleReject={this.hideConfirmExport} />

        {/* Remove confirmation dialog */}
        <DialogConfirmComponent visible={dialogRemoveVisible} message={removeTemplate!} handleOk={this.onConfirmRemove} handleReject={this.hideConfirmRemove} />
      </div>
    );
  }
}

/**
 * Functional wrapper to pass through props
 */
const TableDataPrimeComponent: React.FC<TablePrimeProps> = (props) => <TablePrime {...props} />;

export default TableDataPrimeComponent;
