import ProductsList from "@/components/features/products/products-list/list";
import ProductsListBest from "@/components/features/products/products-list/best";
import styles from "./styles.module.css";

export default function ProductsPage() {
  return (
    <div className={styles.products}>
      <ProductsListBest />
      <ProductsList />
    </div>
  );
}
