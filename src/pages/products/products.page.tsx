import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Product from '../../models/Product.model.ts';
import productService from '../../services/product.service.ts';
import TableDataPrimeComponent, { type DataTableObject } from '../../components/TableDataPrime.component';
import LoaderPointsComponent from '../../components/LoaderPoints.component.tsx';

export default function ProductsPage() {
  const { category } = useParams<{ category: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getProducts = async () => {
    setLoading(true);
    const resProducts = await productService.get_all_product();
    let data: Product[] = resProducts.data ? (resProducts.data as Product[]) : [];
    
    // Filtrar por categoría si no es "all"
    if (category && category !== 'all') {
      data = data.filter(p => p.category?.toLowerCase() === category.toLowerCase());
    }
    
    setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    getProducts();
  }, [category]); // recargar cuando cambie la categoría en la URL

  const removeProduct = async (id: string | number) => {
    await productService.delete_product(Number(id));
    await getProducts(); // refrescar la tabla después de eliminar
  };

  const dataTable: DataTableObject = {
    arrayData: products,
    headerTable: <p>Products - Category: {category}</p>,
  };

  return (
    <>
      <div className={'text-center mb-2'}>
        <h1>Products</h1>
        <h3 className={'italic text-gray-500'}>Category: {category}</h3>
      </div>
      <div className={'flex justify-center'}>
        {loading ? (
          <div className={'w-screen h-screen fixed top-1/2'}>
            <LoaderPointsComponent />
          </div>
        ) : products.length > 0 ? (
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
            onRemove={removeProduct}
          />
        ) : (
          <p>No products found for category "{category}"</p>
        )}
      </div>
    </>
  );
}
