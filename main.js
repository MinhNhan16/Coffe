console.log("java123");
console.log("java123");
console.log("java123");
console.log("java123");
console.log("java123");
console.log("java123");
console.log("java123");
console.log("java123");
console.log("java123");
console.log("java123");
console.log("java123");
console.log("java123");
console.log("java123");
console.log("java123");
console.log("java123");
console.log("java123");
console.log("java123");
console.log("java123");
console.log("java123");
console.log("java123");
console.log("java123");
console.log("java123");
console.log("java123");
console.log("java123");
console.log("java123");
console.log("java123");
console.log("java123");
console.log("java123");
console.log("java123");
console.log("java123");
console.log("java123");
console.log("java123");
console.log("java123");
console.log("java123");
console.log("java123");
console.log("java123");
console.log("java123");
import { useState, useEffect } from "react";

const Basket = () => {
  const [basket, setBasket] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBasket();
  }, []);

  const fetchBasket = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Vui lòng đăng nhập để xem giỏ hàng.");
      }

      const response = await fetch("http://localhost:5005/api/basket/3", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error(`Lỗi HTTP: ${response.status}`);
      }

      const result = await response.json();
      console.log("API Response:", result); // In ra toàn bộ phản hồi từ API

      // Kiểm tra xem data và items có tồn tại và là một mảng không
      if (!result.data || !Array.isArray(result.data.items)) {
        console.error("Dữ liệu giỏ hàng không hợp lệ:", result.data);
        throw new Error("Dữ liệu giỏ hàng không hợp lệ!");
      }

      setBasket(result.data.items);
    } catch (error) {
      console.error("Lỗi tải giỏ hàng:", error);
      setError(error.message || "Không thể tải giỏ hàng. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Đang tải giỏ hàng...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Giỏ hàng</h2>
      {basket.length > 0 ? (
        <ul>
          {basket.map((item) => (
            <li key={item.id}>
              {item.name} - {item.price}đ
            </li>
          ))}
        </ul>
      ) : (
        <p>Giỏ hàng trống.</p>
      )}
    </div>
  );
};

export default Basket;
