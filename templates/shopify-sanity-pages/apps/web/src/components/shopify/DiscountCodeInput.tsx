import { useState } from "react";

import { useCart } from "@shopify/hydrogen-react";

export default function DiscountCodeInput() {
  const [code, setCode] = useState("");
  const { discountCodesUpdate } = useCart();

  const applyDiscount = async () => {
    if (!code || code === "") return null;

    await discountCodesUpdate([code]);
  };

  return (
    <div>
      <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Discount code" />
      <button onClick={applyDiscount}>Apply</button>
    </div>
  );
}
