const BASE_URL = process.env.NEXT_PUBLIC_API || "";
export const apiRoutes = {
  store_inventories: `${BASE_URL}/inventories/outlet`,
  all_inventories: `${BASE_URL}/inventories/`,
  customers: `${BASE_URL}/customers`,
  outlets: `${BASE_URL}/outlets`,
};
