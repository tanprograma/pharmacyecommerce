import axios from "axios";
const BASE_URL = process.env.NEXT_PUBLIC_API || "";

export const apiRoutes = {
  store_inventories: `${BASE_URL}/inventories/outlet`,
  all_inventories: `${BASE_URL}/inventories/`,
  customers: `${BASE_URL}/customers`,
  outlets: `${BASE_URL}/outlets`,
};
export class AppUtilities {
  static async getStoreInventory(url: string) {
    const req = await fetch(url, {
      cache: "no-store",
    });
    const res = await req.json();
    return this.transformStoreInventory(res);
  }
  // converts inventory into simple
  static transformStoreInventory(inventories: any) {
    return inventories.map((i: any) => {
      const unit = i.product.units.sort((a: any, b: any) => {
        if (a.value > b.value) return -1;
        if (a.value < b.value) return 1;
        return 0;
      })[0];

      return {
        id: i.id,
        name: i.product.name,
        quantity: i.quantity,
        unit: unit,
        outlet: i.outlet,
      };
    });
  }
  static async getRawStoreInventory(store: string) {
    const req = await axios.get(
      `${process.env.NEXT_PUBLIC_API}/inventories/outlet/${store}`
    );
    return req.data;
  }
  static async fetchResource(url: string) {
    const req = await axios.get(url);
    return req.data;
  }
  static async getCustomers() {
    const req = await axios.get(`${process.env.NEXT_PUBLIC_API}/customers`);
    return req.data;
  }
  static getFullName(customer: {
    id: string;
    firstname: string;
    middlename: string;
    surname: string;
    projectId: number;
  }) {
    return `${customer.firstname} ${customer.middlename || ""} ${
      customer.surname || ""
    }`;
  }
}
