import MainLayout from '../components/MainLayout';
import ShopHero from '../components/shop/ShopHero';
import ProductsGrid from '../components/shop/ProductsGrid';
import FeaturedProducts from '../components/shop/FeaturedProducts';

export default function ShopPage() {
  return (
    <MainLayout>
      <div className="space-y-0">
        <ShopHero />
        <FeaturedProducts />
        <ProductsGrid />
      </div>
    </MainLayout>
  );
}