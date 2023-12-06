export default function itemsReducer(items: any, action: any) {
  switch (action.type) {
    case "add": {
      const found = items.find((i: any) => i.id == action.item.id);
      if (found && found.unit == action.item.unit) {
        action.item.quantity += found.quantity;
        return items.map((i: any) =>
          i.id == action.item.id ? action.item : i
        );
      }
      return [action.item, ...items];
    }
    case "edit": {
      return items.map((i: any) => (i.id == action.item.id ? action.item : i));
    }
    case "delete": {
      return items.filter((i: any) => i.id != action.id);
    }
    case "deleteAll": {
      return [];
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
