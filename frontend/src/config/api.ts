import request, { BASE_URL, resolveRequest } from "./axios";
interface TCreateItem {
  name: string;
  startingPrice: number;
  sellerId: number;
  time: number;
  timeFrameType: "minutes" | "hours" | "days";
}
interface TPlaceBid {
  itemId: number;
  amount: number;
}
interface TRegisterUser {
  name: string;
  email: string;
  password: string;
}
interface TUpdateUserById {
  name: string;
  address: string;
}
interface TUpdateBalance {
  balance: number;
}
interface TLoginUser {
  email: string;
  password: string;
}
const users = {
  getUser: (id: number) => resolveRequest(request.get(`/users/${id}`, {})),
  getUserBids: () => resolveRequest(request.get(`/users/bids`, {})),
  getAllUsers: () => resolveRequest(request.get(`/users`, {})),
  registerUser: (body: TRegisterUser) =>
    resolveRequest(request.post(`/users`, body)),
  updatedUserById: (body: TUpdateUserById) =>
    resolveRequest(request.put(`/users`, body)),
  updateUserBalance: (body: TUpdateBalance) =>
    resolveRequest(request.put(`/users/balance`, body)),
};
const auth = {
  getUser: () => resolveRequest(request.get(`/auth`, {})),
  loginUser: (body: TLoginUser) => resolveRequest(request.post(`/auth`, body)),
  updatePassword: (body) =>
    resolveRequest(request.patch(`/auth/update-password`, body)),
};
const item = {
  getItem: (itemId) => resolveRequest(request.get(`/item/${itemId}`, {})),
  getAllItems: () => resolveRequest(request.get(`/item`, {})),
  createItem: (body: TCreateItem) => resolveRequest(request.post(`/`, body)),
};
const bid = {
  placeBid: (body: TPlaceBid) => resolveRequest(request.post(`/bid`, body)),
  getBidsByItemId: (itemId: number) =>
    resolveRequest(request.get(`/bid/${itemId}`, {})),
};
const api = {
  users,
  auth,
  item,
  bid,
};
export default api;
