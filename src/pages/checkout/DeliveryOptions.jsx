import { formatMoney } from "../../utils/money";
import dayjs from "dayjs";
import axios from "axios";
export function DeliveryOptions({deliveryOptions, cartItem, loadCart}){

  const updateDeliveryOption = async (deliveryOption) => {
    await axios.put(`/api/cart-items/${cartItem.productId}`, {
      deliveryOptionId: deliveryOption.id
    });
    await loadCart();
  };

  return (
    deliveryOptions.map((deliveryOption) => {
        let price = 'FREE Shipping';
        if (deliveryOption.priceCents > 0) {
          price = `${formatMoney(deliveryOption.priceCents)} - Shipping`;
        }
        return (
          <div key={deliveryOption.id} className="delivery-option"
          onClick={() => updateDeliveryOption(deliveryOption)}>
            <input type="radio"
              checked={deliveryOption.id === cartItem.deliveryOptionId}
              onChange={() => {}}
              className="delivery-option-input"
              name={cartItem.productId} />
            <div>
              <div className="delivery-option-date">
                {dayjs(deliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
              </div>
              <div className="delivery-option-price">
                {price}
              </div>
            </div>
          </div>
        );
      })
  );
};