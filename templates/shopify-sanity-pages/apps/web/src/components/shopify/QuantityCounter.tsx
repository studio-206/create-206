interface Props {
  quantity: number;
  qtyLimit?: number;
  handleQuantityChange: (value: number) => void;
}

export const QuantityCounter: React.FC<Props> = ({
  quantity = 1,
  qtyLimit = 100,
  handleQuantityChange,
}) => {
  return (
    <div className="flex justify-between items-center p-3 gap-10 relative">
      <button
        className="pr-2"
        disabled={qtyLimit !== 0 && quantity - 1 < 1}
        data-state="open"
        onClick={() => {
          handleQuantityChange(-1);
        }}
      >
        -
      </button>
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {quantity}
      </span>
      <button
        className="pl-2"
        disabled={(qtyLimit !== 0 && quantity === qtyLimit) || quantity >= 50}
        onClick={() => handleQuantityChange(1)}
      >
        +
      </button>
    </div>
  );
};
