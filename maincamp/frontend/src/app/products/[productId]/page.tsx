import ProductsDetailContents from "@/components/features/products/products-detail/contents";
import ProductsDetailCommentWrite from "@/components/features/products/products-detail/comment-write";
import styles from "./styles.module.css";

export default function ProductDetailPage() {
  return (
    <div className={styles.productsDetail}>
      <ProductsDetailContents />
      <ProductsDetailCommentWrite />
    </div>
  );
}
