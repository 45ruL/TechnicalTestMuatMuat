import { ProductType } from "@/types/productType";
import { convertToIDR } from "@/utils/convertToIDR";
import Image from "next/image";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

interface CardProductProps {
  product: ProductType;
  onEdit: (product: ProductType) => void;
  onDelete: (id: number | string) => void;
}

const CardProduct = ({ product, onEdit, onDelete }: CardProductProps) => {
  return (
    <div className="relative border rounded-lg shadow">
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
        <button onClick={() => onEdit(product)}>
          <AiFillEdit color="blue" size={24} />
        </button>
        <button onClick={() => onDelete(product.id)}>
          <AiFillDelete color="red" size={24} />
        </button>
      </div>
    </div>
  );
};

export default CardProduct;
