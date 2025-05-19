import React, { useEffect, useState } from 'react';
import TableDataPrimeComponent, { type DataTableObject } from '../../components/TableDataPrime.component';
import Product from '../../models/Product.model';
import productService from '../../services/product.service';
import type ReturningService from '../../models/ReturningService.model';
import { useNavigate } from 'react-router-dom';
import LoaderPointsComponent from '../../components/LoaderPoints.component.tsx';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  const getProducts = async () => {
    const res_products: ReturningService = await productService.get_all_product();
    const data: Product[] = res_products.data ? (res_products.data as Product[]) : [new Product()];
    setProducts(data);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const removeProduct = async (id: string | number) => {
    const req = await productService.delete_product(Number(id));
    if (req.status === 200) {
      alert(`Producto con id (${id}) eliminado`);
      getProducts(); 
    }
  };

  const dataTable: DataTableObject = {
    arrayData: products,
    headerTable: <p>Products</p>,
  };

  return (
    <>
      <div className={'text-center mb-2'}>
        <h1>Products</h1>
      </div>
      <div className={'flex justify-center'}>
        {products.length > 0 ? (
          <TableDataPrimeComponent
            data={dataTable}
            navigation={{
              navigate,
              urls: {
                create: '/products/create',
                update: '/products/update',
                view: '/products/view',
              },
            }}
            onRemove={(id) => removeProduct(id)}
          />
        ) : (
          <div className={'w-screen h-screen fixed top-1/2'}>
            <LoaderPointsComponent />
          </div>
        )}
      </div>
    </>
  );
}
