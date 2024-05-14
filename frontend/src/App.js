import "./App.css";
import Home from "./components/Home";

import Navbar1 from "./components/Navbar/Navbar1";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Packages from "./components/Packages";
import Store from "./components/Store";
import Footer from "./components/Footer/Footer";
import ContactUs from "./components/Footer/Footer pages/ContactUs";
import Conditions from "./components/Footer/Footer pages/Conditions";
import Feedback from "./components/Footer/Footer pages/Feedback";
import Location from "./components/Footer/Footer pages/Location";
import Policy from "./components/Footer/Footer pages/Policy";
import Story from "./components/Footer/Footer pages/Story";
import Aims from "./components/Footer/Footer pages/Aims";
import SignIn from "./components/Signin/SignIn";
import SignUp from "./components/Signup/SignUp";
import axios from "axios";
import { Toaster } from "react-hot-toast";

import Dashboard from "./components/Dashboards/Dashboard";
import Admin from "./components/Dashboards/Admin";
import Instructor from "./components/Dashboards/Instructor";
import Supplier from "./components/Dashboards/Supplier";
import UserProfile from "./components/UserProfile";
import UserManager from "./components/user Manager/UserManager";
import CustomerData from "./components/user Manager/CustomerData";
import SupplierData from "./components/user Manager/SupplierData";
import InstructorData from "./components/user Manager/InstructorData";
import UpdateUser from "./components/UpdateUser";
import ForgotPassword from "./components/Signin/ForgotPassword";
import ResetPassword from "./components/Signin/ResetPassword";
import Addpromo from './components/Packages/Addpromo';
import Promopackages from './components/Packages/Promopackages';
import PromoDetail from './components/Packages/PromoDetail';
import Subscriptionpage from './components/SubscriptionPage'

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <div className="page-container">
      <BrowserRouter>
        <div className="content-wrap">
          <Navbar1 />
          <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />

          <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/store" element={<Store />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/" element={<Home />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/aims" element={<Aims />} />
            <Route path="/conditions" element={<Conditions />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/location" element={<Location />} />
            <Route path="/policy" element={<Policy />} />
            <Route path="/story" element={<Story />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/instructor" element={<Instructor />} />
            <Route path="/supplier" element={<Supplier />} />

            <Route path="/user" element={<UserProfile />} />
            <Route path="/usermanager" element={<UserManager />} />
            <Route path="/customerData" element={<CustomerData />} />
            <Route path="/instructorData" element={<InstructorData />} />
            <Route path="/supplierData" element={<SupplierData />} />
            <Route path="/updateuser" element={<UpdateUser />} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />
            <Route path="/add" element={<Addpromo/>} exact />
            <Route path="/package" element={<Promopackages/>}  exact/>
            <Route path="/packages/:id" element={<PromoDetail/>}  exact/>     
            <Route path="/subscription/:id" element={<Subscriptionpage />} />
            <Route
              path="/reset-password/:id/:token"
              element={<ResetPassword />}
            />
          </Routes>
        </div>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
