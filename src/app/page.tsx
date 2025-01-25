/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import FormProduct from "@/components/FormProduct";
import { useProductStore } from "@/store/useProductStore";
import { ProductType } from "@/types/productType";
import { convertToIDR } from "@/utils/convertToIDR";
import Image from "next/image";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

export default function Home() {
  const [isAddProduct, setIsAddProduct] = useState(false);
  const [product, setProduct] = useState<null | ProductType>(null);
  const [filterSort, setFilterSort] = useState("");
  const [search, setSearch] = useState("");
  const [pokemonData, setPokemonData] = useState<any>(null);

  const products = useProductStore((state) => state.products);
  const deleteProducts = useProductStore((state) => state.deleteProduct);

  const filteredProducts = products
    .filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (filterSort === "asc") {
        return b.price - a.price;
      } else if (filterSort === "desc") {
        return a.price - b.price;
      } else {
        return 0;
      }
    });

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

  return (
    <main>
      <section className="p-4 w-full max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold">My Catalog</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-14">
          <div className="col-span-1">
            <h2 className="text-xl font-bold">Filter Product</h2>
            <div className="my-4">
              <p className="mb-2">Search</p>
              <input
                type="text"
                placeholder="Search"
                className="p-2 rounded-lg border w-full mb-4"
                onChange={(e) => setSearch(e.target.value || "")}
              />
            </div>
            <div className="my-2 flex flex-col">
              <p>Sort</p>
              <div className="my-2 flex gap-2 items-center">
                <input
                  type="radio"
                  value="asc"
                  checked={filterSort === "asc"}
                  onChange={(e) => setFilterSort(e.target.value)}
                />
                <label htmlFor="">Termahal</label>
              </div>
              <div className="my-2 flex gap-2 items-center">
                <input
                  type="radio"
                  value="desc"
                  checked={filterSort === "desc"}
                  onChange={(e) => setFilterSort(e.target.value)}
                />
                <label htmlFor="">Termurah</label>
              </div>
              <div className="my-2 flex gap-2 items-center">
                <input
                  type="radio"
                  value=""
                  checked={filterSort === ""}
                  onChange={(e) => setFilterSort(e.target.value)}
                />
                <label htmlFor="">No Filter</label>
              </div>
            </div>
          </div>
          <div className="col-span-2">
            <button
              className="my-4 bg-slate-900 text-white py-2 px-4 rounded-lg "
              onClick={() => setIsAddProduct(true)}
            >
              Add Product
            </button>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {filteredProducts?.map((product) => (
                <div
                  key={product.id}
                  className="relative border rounded-lg shadow"
                >
                  <Image
                    src={product.image || "/placeholderImage.png"}
                    alt="Product Image"
                    width={500}
                    height={200}
                  />
                  <div className="p-4">
                    <p className="text-lg font-semibold mt-4">{product.name}</p>
                    <p className="text-sm mt-2 text-gray-600">
                      {convertToIDR(product.price)}
                    </p>
                    <p className="text-sm mt-2 text-gray-600">
                      Stok : <span className="font-bold">{product.stock}</span>
                    </p>
                  </div>

                  <div className="absolute top-1 right-1 space-x-2">
                    <button onClick={() => setProduct(product)}>
                      <AiFillEdit color="blue" size={24} />
                    </button>
                    <button onClick={() => deleteProducts(product.id)}>
                      <AiFillDelete color="red" size={24} />
                    </button>
                  </div>
                </div>
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
        <div className=" p-4 relative -z-10 my-24 w-full max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold mb-6 text-center">Pokemon Data</h1>
          <DataTable columns={columns} data={pokemonData || []} pagination />
        </div>
      </section>
    </main>
  );
}
