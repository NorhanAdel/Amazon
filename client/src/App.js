import "./App.css";
import Navbar from "./component/Navbar/Navbar";
import NewNavbar from "./component/NewNavbar/NewNavbar";
import Footer from "./container/Footer/Footer";
import Home from "./page/Home/Home";
import { Routes, Route } from "react-router-dom";
import Login from "./page/Login/Login";
import Register from "./page/Register/Register";
import Cart from "./component/Cart/Cart";
import BuyNow from "./page/BuyNow/BuyNow";
import Feature from "./page/Feature/Feature";
import NotFound from "./component/NotFound/NotFound";
import CircularProgress from "@mui/material/CircularProgress";
import ProductPage from "./page/ProductPage/ProductPage";
import CheckOut from "./page/CheckOut/CheckOut";
import { useEffect, useState } from "react";
import Profile from "./page/Profile/Profile";
import Orders from "./component/Order/Order";
import Account from "./page/Account/Account";
import OrderSummary from "./page/OrderSummary/OrderSummary";
import AllPage from "./page/AllPage/AllPage";

function App() {
  const [data, setData] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setData(true);
    }, 2000);
  }, []);
  return (
    <div className="App">
      {data ? (
        <>
          <Navbar />
          <NewNavbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/product/:id" element={<Cart />} />
            <Route path="/buynow" element={<BuyNow />} />

            <Route path="/productpage" element={<ProductPage />} />
            <Route path="/checkout" element={<CheckOut />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/order" element={<Orders />} />
            <Route path="/account" element={<Account />} />
            <Route path="/order-summary" element={<OrderSummary />} />
            <Route path="/feature" element={<AllPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>

          <Footer />
        </>
      ) : (
        <div className="circular">
          <CircularProgress />
        </div>
      )}
    </div>
  );
}

export default App;
