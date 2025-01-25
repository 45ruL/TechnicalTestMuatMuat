/* eslint-disable @typescript-eslint/no-explicit-any */
interface InputProps {
  label: string;
  validation: boolean;
  value: string | number;
  onChange: (e: any) => void;
}

const Input: React.FC<InputProps> = ({
  label,
  onChange,
  validation,
  value,
}) => {
  return (
    <div>
      <label htmlFor="name" className="text-sm font-medium mb-2">
        {label}
      </label>
      <input
        type="text"
        id="name"
        className={`w-full p-2 border rounded mb-4 ${
          validation && "border-red-600"
        }`}
        value={value}
        onChange={onChange}
      />
      {validation && (
        <p className="text-red-600 text-sm mb-4">Name is required</p>
      )}
    </div>
  );
};

export default Input;
