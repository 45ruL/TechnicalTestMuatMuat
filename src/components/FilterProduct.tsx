import { ChangeEvent } from "react";

interface FilterProductProps {
  search: string;
  filterSort: string;
  onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSortChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const FilterProduct = ({
  search,
  filterSort,
  onSearchChange,
  onSortChange,
}: FilterProductProps) => {
  return (
    <div className="col-span-1">
      <h2 className="text-xl font-bold">Filter Product</h2>
      <div className="my-4">
        <p className="mb-2">Search</p>
        <input
          type="text"
          placeholder="Search"
          value={search}
          className="p-2 rounded-lg border w-full mb-4"
          onChange={onSearchChange}
        />
      </div>
      <div className="my-2 flex flex-col">
        <p>Sort</p>
        <div className="my-2 flex gap-2 items-center">
          <input
            type="radio"
            value="asc"
            checked={filterSort === "asc"}
            onChange={onSortChange}
          />
          <label htmlFor="">Termahal</label>
        </div>
        <div className="my-2 flex gap-2 items-center">
          <input
            type="radio"
            value="desc"
            checked={filterSort === "desc"}
            onChange={onSortChange}
          />
          <label htmlFor="">Termurah</label>
        </div>
        <div className="my-2 flex gap-2 items-center">
          <input
            type="radio"
            value=""
            checked={filterSort === ""}
            onChange={onSortChange}
          />
          <label htmlFor="">No Filter</label>
        </div>
      </div>
    </div>
  );
};

export default FilterProduct;
