import ProductsDetailContents from "@/components/features/products/products-detail/contents";
import styles from "./styles.module.css";

export default function ProductDetailPage() {
  return (
    <div className={styles.productsDetail}>
      <ProductsDetailContents />
    </div>
  );
}
