import PaginationBar from "@/components/PaginationBar";
import ProductCard from "@/components/ProductCard";
import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface HomeProps {
  searchParams: { page: string };
}

export default async function Home({
  searchParams: { page = "1" },
}: HomeProps) {
  const currentPage = parseInt(page);

  const pageSize = 6;
  const heroItemCount = 1;

  const totalItemCount = await fetch("http:localhost:3000/products/count")
    .then((response) => response.json())
    .then((data) => data);

  const totalPages = Math.ceil((totalItemCount - heroItemCount) / pageSize);

  const skip = (currentPage - 1) * pageSize + (currentPage === 1 ? 0 : heroItemCount);
  const take = pageSize + (currentPage === 1 ? heroItemCount : 0);

  const productsResponse = await fetch(`http://localhost:3000/products?skip=${skip}&take=${take}`);
  const products = await productsResponse.json();

  return (
    <div className="flex flex-col items-center">
      {currentPage === 1 && (
        <div className="hero rounded-xl bg-base-200">
          <div className="hero-content flex-col lg:flex-row">
            <Image
              src={products[0].imageUrl}
              alt={products[0].name}
              width={400}
              height={800}
              className="w-full max-w-sm rounded-lg shadow-2xl"
              priority
            />
            <div>
              <h1 className="text-5xl font-bold">{products[0].name}</h1>
              <p className="py-6">{products[0].description}</p>
              <Link
                href={"/products/" + products[0].id}
                className="btn-primary btn"
              >
                Saiba mais
              </Link>
            </div>
          </div>
        </div>
      )}

      <div className="my-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {(currentPage === 1 ? products.slice(1) : products).map((product: Product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>

      {totalPages > 1 && (
        <PaginationBar currentPage={currentPage} totalPages={totalPages} />
      )}
    </div>
  );
}