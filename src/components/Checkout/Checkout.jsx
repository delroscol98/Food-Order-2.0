import { useContext } from "react";
import Error from "../Error/error";
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

  const closeHandler = () => {
    userProgressCtx.hideCheckout();
  };

  const clearCartHandler = () => {
    userProgressCtx.hideCheckout();
    cartCtx.clearCart();
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
  };

  if (data && !error) {
    return (
      <Modal
        open={userProgressCtx.progress === "checkout"}
        onClose={clearCartHandler}
      >
        <h2>Success!</h2>
        <p>Your order was submitted sucessfully!</p>
        <p>Check your email for more details!</p>
        <p className="modal-actions">
          <Button onClick={clearCartHandler}>Okay</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal
      open={userProgressCtx.progress === "checkout"}
      onClose={userProgressCtx.progress === "checkout" ? closeHandler : null}
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

        {error && <Error title="Failed to submit order" message={error} />}

        <p className="modal-actions">
          {isLoading ? (
            <span>Sending order data...</span>
          ) : (
            <>
              <Button type="button" textOnly onClick={closeHandler}>
                Close
              </Button>
              <Button>Submit Order</Button>
            </>
          )}
        </p>
      </form>
    </Modal>
  );
};

export default Checkout;
