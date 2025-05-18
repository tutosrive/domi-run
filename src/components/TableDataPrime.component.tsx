import React, { type JSX } from 'react';
import Restaurant from '../../models/Restaurant.model';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

interface DataRestaurant {
  restaurants: Restaurant[] | undefined;
  bodyColumn?: JSX.Element;
  sortable?: boolean;
}

interface TableRestaurantsProps {
  /* Data object */
  data: DataRestaurant;
}

class TableRestaurants {
  /** The reference to can download the data */
  public tableReference;
  private dataArray: Array;
  createColumns() {
    // When dataArray is null, "do nothing"
    if (!this.dataArray || this.dataArray.length === 0) return null;
    // Get all keys from the object
    let keys = Object.keys(this.dataArray[0]);

    // if it has “id” key, put first
    if (keys.includes('id')) keys = ['id', ...keys.filter((k) => k !== 'id')];

    // For each key, capitalize and add to "Field" and "Header" props ("<Column/>" component)
    return keys.map((key: string) => {
      const capitalizeKey: string = `${key.charAt(0).toUpperCase()}${key.slice(1)}`;
      return <Column key={key} field={key} header={capitalizeKey} />;
    });
  }
  /** Return the JSX content
   * @param configs - Columns configurations.
   */
  component(configs: DataRestaurant) {
    this.dataArray = configs.restaurants;
    console.log(this.createColumns());
    return (
      <DataTable
        ref={(this_ref) => (this.tableReference = this_ref)}
        value={configs.restaurants}
        dataKey={'id'}
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25]}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="{first}/{last} | Total: {totalRecords}"
      >
        {this.createColumns()}
      </DataTable>
    );
  }
}

const TableRestaurantsComponent: React.FC<TableRestaurantsProps> = ({ data }) => {
  const instanceTable: TableRestaurants = new TableRestaurants();
  const TableComponent = () => instanceTable.component(data);
  return <TableComponent />;
};

export default TableRestaurantsComponent;
export type { DataRestaurant };
