import { useQueryParam } from '../hooks/useQueryParam';
import { useFetchListWithParams } from '../hooks/useFetchListWithParams';

export default function ProductList() {
  const [page, setPage] = useQueryParam('page', 1);
  const [limit, setLimit] = useQueryParam('limit', 12);
  const [search, setSearch] = useQueryParam('search', '');
  const [sort, setSort] = useQueryParam('sort', '');

  const { products, total, loading } = useFetchListWithParams({
    page: Number(page),
    limit: Number(limit),
    search,
    sort,
  });

  const totalPages = Math.ceil(total / limit);

  return (
    <div style={{ padding: 20 }}>
      <h2>🛍️ Danh sách sản phẩm</h2>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Tìm theo tên..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Select Limit */}
      <select value={limit} onChange={(e) => setLimit(e.target.value)}>
        <option value={4}>4 / trang</option>
        <option value={8}>8 / trang</option>
        <option value={12}>12 / trang</option>
      </select>

      {/* Sort */}
      <select value={sort} onChange={(e) => setSort(e.target.value)}>
        <option value="">-- Sắp xếp --</option>
        <option value="price-asc">Giá tăng</option>
        <option value="price-desc">Giá giảm</option>
        <option value="az">Tên A-Z</option>
        <option value="za">Tên Z-A</option>
      </select>

      {/* Product List */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
          {products.map((product) => (
            <div key={product.id} style={{ border: '1px solid #ccc', padding: 10 }}>
              <img src={product.thumbnail} alt={product.title} style={{ width: '100%', height: 100 }} />
              <h4>{product.title}</h4>
              <p>{product.price} $</p>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div style={{ marginTop: 20 }}>
        <button onClick={() => setPage(Number(page) - 1)} disabled={page <= 1}>
          ⬅️ Prev
        </button>
        <span> Page {page} / {totalPages} </span>
        <button onClick={() => setPage(Number(page) + 1)} disabled={page >= totalPages}>
          Next ➡️
        </button>
      </div>
    </div>
  );
}
