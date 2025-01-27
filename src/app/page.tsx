/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import CardProduct from "@/components/CardProduct";
import FilterProduct from "@/components/FilterProduct";
import FormProduct from "@/components/FormProduct";
import { useProductStore } from "@/store/useProductStore";
import { ProductType } from "@/types/productType";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

export default function Home() {
  const [isAddProduct, setIsAddProduct] = useState(false);
  const [product, setProduct] = useState<null | ProductType>(null);
  const [filterSort, setFilterSort] = useState("");
  const [search, setSearch] = useState("");
  const [pokemonData, setPokemonData] = useState<any>(null);

  // const products = useProductStore((state) => state.products);
  const deleteProduct = useProductStore((state) => state.deleteProduct);
  const searchProducts = useProductStore((state) => state.searchProducts);
  const sortByPrice = useProductStore((state) => state.sortByPrice);
  const filteredProducts = useProductStore((state) => state.filteredProducts);

  async function getPokemonData() {
    try {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=50"
      );
      const data = await response.json();
      console.log(data?.results);
      setPokemonData(data?.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const columns = [
    {
      name: "Pokemon Name",
      sortable: true,
      selector: (row: any) => row.name,
    },
    {
      name: "Pokemon URL",
      sortable: true,
      selector: (row: any) => row.url,
    },
  ];

  useEffect(() => {
    getPokemonData();
  }, []);

  useEffect(() => {
    searchProducts(search);
  }, [search, searchProducts]);

  useEffect(() => {
    sortByPrice(filterSort as "asc" | "desc");
  }, [filterSort, sortByPrice]);

  return (
    <main>
      <section className="p-4 w-full max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold">My Catalog</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-14">
          <FilterProduct
            search={search}
            filterSort={filterSort}
            onSearchChange={(e) => setSearch(e.target.value || "")}
            onSortChange={(e) => setFilterSort(e.target.value)}
          />
          <div className="col-span-2">
            <button
              className="my-4 bg-slate-900 text-white py-2 px-4 rounded-lg "
              onClick={() => setIsAddProduct(true)}
            >
              Add Product
            </button>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {filteredProducts?.map((product) => (
                <CardProduct
                  key={product.id}
                  product={product}
                  onEdit={setProduct}
                  onDelete={deleteProduct}
                />
              ))}

              {product && (
                <FormProduct
                  product={product}
                  onClose={() => setProduct(null)}
                ></FormProduct>
              )}

              {isAddProduct && (
                <FormProduct onClose={() => setIsAddProduct(false)} />
              )}
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className=" p-4  my-24 w-full max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold mb-6 text-center">Pokemon Data</h1>
          <DataTable columns={columns} data={pokemonData || []} pagination />
        </div>
      </section>
    </main>
  );
}
