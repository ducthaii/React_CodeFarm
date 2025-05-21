import { useEffect, useState } from 'react';

export function useFetchListWithParams({ page, limit, search, sort }) {
  const [data, setData] = useState({ products: [], total: 0 });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      const skip = (page - 1) * limit;
      let url = `https://dummyjson.com/products/search?q=${search || ''}&limit=${limit}&skip=${skip}`;

      try {
        const res = await fetch(url);
        const result = await res.json();

        let products = result.products;

        // Sorting
        if (sort === 'price-asc') products.sort((a, b) => a.price - b.price);
        if (sort === 'price-desc') products.sort((a, b) => b.price - a.price);
        if (sort === 'az') products.sort((a, b) => a.title.localeCompare(b.title));
        if (sort === 'za') products.sort((a, b) => b.title.localeCompare(a.title));

        setData({ products, total: result.total });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, limit, search, sort]);

  return { ...data, loading };
}
