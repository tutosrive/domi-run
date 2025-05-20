import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../slice/cart.slice';
import TableDataPrimeComponent from '../../components/TableDataPrime.component';
import { Column } from 'primereact/column';
import LoaderPointsComponent from '../../components/LoaderPoints.component';
import Product from '../../models/Product.model';
import productService from '../../services/product.service';
import { Ripple } from 'primereact/ripple';

export default function ProductsPage() {
  const { category } = useParams<{ category: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getProducts = async () => {
    setLoading(true);
    const res = await productService.get_all_product();
    let data: Product[] = res.data ? (res.data as Product[]) : [];

    if (category && category !== 'all') {
      data = data.filter((p) => p.category?.toLowerCase() === category.toLowerCase());
    }

    setProducts(data);

    // Inicializar cantidades
    const initialQuantities: Record<number, number> = {};
    data.forEach((p) => (initialQuantities[p.id] = 1));
    setQuantities(initialQuantities);

    setLoading(false);
  };

  useEffect(() => {
    getProducts();
  }, [category]);

  if (loading) {
    return <LoaderPointsComponent />;
  }

  // Columna de acciones: input + botón con ripple
  const actionColumn = (
    <Column
      key="actions"
      header="Cantidad / Agregar"
      body={(rowData: Product) => {
        const qty = quantities[rowData.id] ?? 1;

        return (
          <div className="flex items-center space-x-2">
            <input
              type="number"
              min={1}
              className="w-16 border rounded px-2 py-1"
              value={qty}
              onChange={(e) => {
                const value = Math.max(1, parseInt(e.target.value) || 1);
                setQuantities((prev) => ({ ...prev, [rowData.id]: value }));
              }}
            />
            <button
              className="p-ripple bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded relative overflow-hidden"
              onClick={() => {
                for (let i = 0; i < qty; i++) {
                  dispatch(addToCart(rowData));
                }
              }}
            >
              Agregar
              <Ripple />
            </button>
          </div>
        );
      }}
      style={{ textAlign: 'center', width: '220px' }}
    />
  );

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <h3 className="italic text-gray-500">Category: {category}</h3>
      </div>

      <div className={'flex justify-center'}>
        <TableDataPrimeComponent
          data={{
            arrayData: products,
            headerTable: 'Products List',
            sortable: true,
            scrollHeight: '60vh',
            templatesAdditionalColumns: {
              end: [actionColumn],
            },
          }}
          navigation={{
            navigate,
            urls: {},
          }}
        />
      </div>
    </div>
  );
}
