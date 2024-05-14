
import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';

import Header1 from './Component/header';
import Training from './Component/training';
import TrainingDetails from './Component/trainingdetails';
import UpdateTraining from './Component/Updatetraining';
import AddPayment from './PaymentComponent/addpayment';
import PaymentDetails from './PaymentComponent/paymentdetails';

import TrainingReqDetails from './Component/request';
import BuyersDashboard from './PaymentComponent/buyersdashboards';



function App() {
  return (
    <div className="App">
 <Router>
 <Header1/>
 <Routes>

 
<Route path='/' element={<Training/>}></Route>
<Route path='/trainingdetails' element={<TrainingDetails/>}></Route>
<Route path='/updatetraining/:id' element={<UpdateTraining/>}></Route>

<Route path='/requestdetaisl' element={<TrainingReqDetails/>}></Route>

<Route path='/addpayment' element={<AddPayment/>}></Route>
<Route path='/paydetails' element={<PaymentDetails/>}></Route>

<Route path='/dash' element={<BuyersDashboard/>}></Route>
   </Routes>
   </Router>
    </div>
  );
}

export default App;
