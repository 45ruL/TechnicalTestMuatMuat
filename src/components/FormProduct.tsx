/* eslint-disable @typescript-eslint/no-explicit-any */
import { useProductStore } from "@/store/useProductStore";
import { ProductType } from "@/types/productType";
import { useState } from "react";
import Input from "./InputLabel";

interface ProductForm {
  product?: ProductType;
  onClose: () => void;
}
export default function FormProduct({ product, onClose }: ProductForm) {
  const [formData, setFormData] = useState({
    name: product?.name || "",
    price: product?.price || 0,
    stock: product?.stock || 0,
  });
  const addProduct = useProductStore((state) => state.addProduct);
  const updateProduct = useProductStore((state) => state.updateProduct);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.stock) {
      return;
    } else {
      if (product) {
        updateProduct(product?.id, formData);
      } else {
        addProduct(formData);
      }
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md m-4">
        <h1 className="mb-4 text-xl font-bold">
          {product ? "Edit" : "Add"} Product
        </h1>
        <form action="" className="flex flex-col">
          <Input
            type="text"
            label="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            validation={!formData.name}
          />

          <Input
            type="number"
            label="Price"
            value={formData.price}
            onChange={(e) =>
              setFormData({
                ...formData,
                price: Number(e.target.value) < 0 ? 0 : Number(e.target.value),
              })
            }
            validation={!formData.price}
          />

          <Input
            type="number"
            label="Stock"
            value={formData.stock}
            onChange={(e) =>
              setFormData({
                ...formData,
                stock: Number(e.target.value) < 0 ? 0 : Number(e.target.value),
              })
            }
            validation={!formData.stock}
          />
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="bg-red-600 text-white py-2 px-4 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-slate-900 text-white py-2 px-4 rounded"
              onClick={handleSubmit}
            >
              {product ? "Save" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
