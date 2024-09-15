import homeReducer from "./reducers/homeReducer";
import userReducer from "./reducers/authReducer";
import cardReducer from "./reducers/cardReducer";
import orderReducer from "./reducers/orderReducer";
import dashboardReducer from "./reducers/dashboardReducer";
import chatReducer from "./reducers/chatReducer";

const rootReducer = {
  home: homeReducer,
  user: userReducer,
  card: cardReducer,
  order: orderReducer,
  dashboard: dashboardReducer,
  chat: chatReducer,
};

export default rootReducer;
