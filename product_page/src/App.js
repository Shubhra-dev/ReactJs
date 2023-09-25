import { useEffect, useReducer } from "react";
import "./App.css";

const initialState = {
  products: [],
  query: "",
  searchQuery: "",
  category: [],
  productClick: false,
  displayProduct: {},
  cart: [],
  cartView: false,
  checkout: false,
  totalBill: 0,
};
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      const categories = action.payload.map((arr) => arr.category);
      if (state.cart.length === 0)
        return {
          ...state,
          products: action.payload,
          category: ["All", ...new Set(categories)],
        };
      return {
        ...state,
        products: action.payload.map((product) => {
          const cartid = state.cart.map((arr) => arr.id);
          if (cartid.includes(product.id)) return { ...product, toCart: true };
          return product;
        }),
      };
    case "categoryClick":
      return {
        ...state,
        query:
          action.payload.category === "All"
            ? ""
            : `category/${action.payload.category}`,
        displayProduct: {},
        productClick: false,
        cartView: false,
        checkout: false,
      };
    case "categoryData":
      return {
        ...state,
        products: action.payload.map((product) => {
          const cartid = state.cart.map((arr) => arr.id);
          if (cartid.includes(product.id)) return { ...product, toCart: true };
          return product;
        }),
      };
    case "productClick":
      return { ...state, productClick: true, displayProduct: action.payload };
    case "back":
      return { ...state, displayProduct: {}, productClick: false };
    case "cart":
      return {
        ...state,
        products: state.products.map((arr) => {
          if (arr.id === action.payload.id) return { ...arr, toCart: true };
          return arr;
        }),
        cart: [...state.cart, action.payload],
        displayProduct: state.displayProduct
          ? { ...state.displayProduct, toCart: true }
          : state.displayProduct,
      };
    case "cartView":
      return { ...state, cartView: true };
    case "search":
      return {
        ...state,
        query: `search?q=${action.payload}`,
        searchQuery: action.payload,
        checkout: false,
      };
    case "checkOut":
      return {
        ...state,
        checkout: true,
        totalBill: action.payload,
      };
    default:
      throw new Error("action not known");
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(
    function () {
      function fetchProduct() {
        fetch(`https://dummyjson.com/products/${state.query}`)
          .then((res) => res.json())
          .then((data) =>
            state.query === ""
              ? dispatch({
                  type: "dataReceived",
                  payload: data.products.map((arr) => {
                    return { ...arr, toCart: false };
                  }),
                })
              : dispatch({
                  type: "categoryData",
                  payload: data.products.map((arr) => {
                    return { ...arr, toCart: false };
                  }),
                })
          )
          .catch((err) => dispatch({ type: "dataFailed" }));
      }
      fetchProduct();
    },
    [state.query]
  );
  return (
    <div>
      <Main state={state} dispatch={dispatch} />
    </div>
  );
}
function Main({ state, dispatch }) {
  const numberCart = state.cart.length;
  console.log(state.products);
  return (
    <section className="main-section">
      <button
        className="checkout-button"
        onClick={() => dispatch({ type: "cartView" })}
      >
        Cart ({numberCart} item)
      </button>
      <Search state={state} dispatch={dispatch} />
      <div className="container">
        <Category categories={state.category} dispatch={dispatch} />
        <div className="product-listings">
          {state.checkout ? (
            <Checkout totalBill={state.totalBill} />
          ) : state.cartView ? (
            <Cart cart={state.cart} dispatch={dispatch} />
          ) : state.productClick === false ? (
            <ProductList products={state.products} dispatch={dispatch} />
          ) : (
            <ProductView product={state.displayProduct} dispatch={dispatch} />
          )}
        </div>
      </div>
    </section>
  );
}
function ProductList({ products, dispatch }) {
  return (
    <>
      <h2>Product Listings</h2>
      {products?.map((product) => (
        <div key={product.id} className="product-card">
          <div
            onClick={() => dispatch({ type: "productClick", payload: product })}
          >
            <div className="product-image">
              <img src={product.thumbnail} alt={product.title} />
            </div>
            <div className="product-info">
              <h5>{product.title}</h5>
              <p>{product.category}</p>
              <h5>${product.price}</h5>
            </div>
          </div>
          <div>
            <button
              onClick={() => dispatch({ type: "cart", payload: product })}
            >
              {product.toCart === true ? "Add More" : "Add to Cart"}
            </button>
          </div>
        </div>
      ))}
    </>
  );
}
function Category({ categories, dispatch }) {
  return (
    <div className="categories">
      <h2>Categories</h2>
      <ul>
        {categories?.map((category) => (
          <li
            key={category}
            onClick={() =>
              dispatch({ type: "categoryClick", payload: { category } })
            }
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProductView({ product, dispatch }) {
  return (
    <div className="product-detail-container">
      <div className="product-image">
        <img src={product.thumbnail} alt={product.title} />
      </div>
      <div className="product-info">
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        <h3>{product.category}</h3>
        <h3>Rating: {product.rating}⭐</h3>
        <h3>Stock: {product.stock}</h3>
        <h2>Price: ${product.price}</h2>
        <button
          className="add-to-cart-button"
          onClick={() => dispatch({ type: "cart", payload: product })}
        >
          {product.toCart === true ? "Add More" : "Add to Cart"}
        </button>
        <br />
        <button
          className="add-to-cart-button"
          onClick={() => dispatch({ type: "back" })}
        >
          Back to Shopping
        </button>
      </div>
    </div>
  );
}
function Cart({ cart, dispatch }) {
  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      <ul className="cart-product-list">
        {cart.map((product) => (
          <li key={product.id} className="cart-product-item">
            <div className="cart-product-details">
              <img src={product.thumbnail} alt={product.title} />
              <div>
                <h3>{product.title}</h3>
                <p>${product.price}</p>
              </div>
            </div>
            <div className="cart-product-actions">
              <input
                type="number"
                value="1"
                min="1"
                className="cart-quantity-input"
              />
              <button className="remove-button">Remove</button>
            </div>
          </li>
        ))}
      </ul>
      <div className="cart-summary">
        <h2>Cart Summary</h2>
        <div className="summary-details">
          <p>
            Total Items: <span id="total-items">{cart.length}</span>
          </p>
          <p>
            Total Price:{" "}
            <span id="total-price">
              ${cart.reduce((acc, product) => acc + Number(product.price), 0)}
            </span>
          </p>
        </div>
        <button
          className="cart-checkout-button"
          onClick={() =>
            dispatch({
              type: "checkOut",
              payload: cart.reduce(
                (acc, product) => acc + Number(product.price),
                0
              ),
            })
          }
        >
          Checkout
        </button>
        <button className="cart-checkout-button">Back To Shopping</button>
      </div>
    </div>
  );
}
function Search({ state, dispatch }) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search Products..."
      value={state.searchQuery}
      onChange={(e) => dispatch({ type: "search", payload: e.target.value })}
    />
  );
}

function Checkout({ totalBill }) {
  return (
    <div className="order-container">
      <div className="order-form">
        <h2>Place Your Order</h2>
        <form>
          <label for="name">Name:</label>
          <input type="text" id="name" name="name" required />

          <label for="email">Email:</label>
          <input type="email" id="email" name="email" required />

          <label for="phone">Phone:</label>
          <input type="tel" id="phone" name="phone" required />

          <label for="address">Shipping Address:</label>
          <input type="text" id="address" name="address" required />
          <h3>Total Bill : ${totalBill}</h3>
          <label for="product">Select Payment:</label>
          <select id="product" name="product" required>
            <option value="COD">Cash On Delivery</option>
            <option value="PO">Payment GateWay (Online)</option>
          </select>

          <button type="submit">Place Order</button>
        </form>
      </div>
    </div>
  );
}

export default App;
