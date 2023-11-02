import { useContext } from "react";
import useFetch from "../hooks/use-fetch";
import Modal from "../Modal/Modal";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";
import Button from "../UI/Button";
import Input from "../UI/Input";
import currencyFormatter from "../utilities/formatting";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-type": "application/json",
  },
};

const Checkout = () => {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const {
    isLoading,
    error,
    dataFetch: postData,
    data,
  } = useFetch(
    "https://food-order-v2-66876-default-rtdb.firebaseio.com/orders.json",
    requestConfig
  );

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  const closeCheckoutHandler = () => {
    userProgressCtx.hideCheckout();
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const formData = Object.fromEntries(data.entries());

    postData({
      order: {
        items: cartCtx.items,
        customer: formData,
      },
    });

    // fetch(
    //   "https://food-order-v2-66876-default-rtdb.firebaseio.com/orders.json",
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       order: {
    //         items: cartCtx.items,
    //         customer: formData,
    //       },
    //     }),
    //   }
    // );
  };

  return (
    <Modal
      open={userProgressCtx.progress === "checkout"}
      onClose={
        userProgressCtx.progress === "checkout" ? closeCheckoutHandler : null
      }
    >
      <form onSubmit={submitHandler}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>

        <Input label="Full name" type="text" id="name" />
        <Input label="Email Address" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>

        <p className="modal-actions">
          <Button type="button" textOnly onClick={closeCheckoutHandler}>
            Close
          </Button>
          <Button>Submit Order</Button>
        </p>
      </form>
    </Modal>
  );
};

export default Checkout;
