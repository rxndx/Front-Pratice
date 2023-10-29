import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from 'react-redux';
import HomePage from "./features/Home/HomePage";
import TableList from "./features/Tables/TableList";
import WaiterList from "./features/Waiters/WaitersList";
import { store } from "./store/store";
import DishList from "./features/Dishes/DishList";
import BillList from "./features/Orders/BillList";

function App() {
  return (
      <Provider store={store}>
        <Router>
          <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/tables" element={<TableList />} />
              <Route path="/waiters" element={<WaiterList />} />
              <Route path="/dishes" element={<DishList />} />
              <Route path="/orders" element={<BillList />} />
          </Routes>
        </Router>
      </Provider>
  );
}

export default App;