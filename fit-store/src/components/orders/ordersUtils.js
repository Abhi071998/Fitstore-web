// Normalizes the /orders/pending response into a consistent shape.
// Actual backend shape: [{ cust_user_id, orders: [...] }, ...]
// This also tolerates a flat array of orders or an object keyed by customer,
// in case the response shape changes later.
export function normalizeOrderGroups(data) {
  if (!data) return [];

  if (Array.isArray(data)) {
    if (data.length > 0 && Array.isArray(data[0]?.orders)) {
      return data.map((group) => ({
        customerLabel: getGroupCustomerLabel(group),
        orders: group.orders,
      }));
    }

    const groups = new Map();
    data.forEach((order) => {
      const key =
        order.shipping_name ||
        order.customer?.name ||
        order.customer_name ||
        (order.cust_user_id ? `Customer #${order.cust_user_id}` : 'Unknown Customer');
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(order);
    });
    return Array.from(groups.entries()).map(([customerLabel, orders]) => ({ customerLabel, orders }));
  }

  if (typeof data === 'object') {
    return Object.entries(data).map(([customerLabel, orders]) => ({
      customerLabel,
      orders: Array.isArray(orders) ? orders : [],
    }));
  }

  return [];
}

function getGroupCustomerLabel(group) {
  const firstOrder = group.orders?.[0];
  return (
    firstOrder?.shipping_name ||
    group.customer?.name ||
    group.customer_name ||
    (group.cust_user_id ? `Customer #${group.cust_user_id}` : 'Unknown Customer')
  );
}

export function countPendingOrders(data) {
  return normalizeOrderGroups(data).reduce((sum, group) => sum + group.orders.length, 0);
}

export function getOrderItems(order) {
  const items = order.items || order.order_items || order.products || [];
  return Array.isArray(items) ? items : [];
}

export function getItemLabel(item) {
  const productName =
    item.product_size?.product?.name || item.name || item.product_name || item.product?.name;
  const size = item.product_size?.size || item.size;

  if (productName) return size ? `${productName} (${size})` : productName;
  if (item.product_size_id) return `Size #${item.product_size_id}`;
  return 'Item';
}

export function getItemProductCode(item) {
  return item.product_size?.product?.product_code || item.product_code || null;
}

export function getItemQuantity(item) {
  return item.quantity ?? item.qty ?? '';
}

export function getItemUnitPrice(item) {
  return item.unit_price ?? item.price ?? null;
}

export function computeOrderTotal(order) {
  return getOrderItems(order).reduce((sum, item) => {
    const qty = Number(getItemQuantity(item)) || 0;
    const price = Number(getItemUnitPrice(item)) || 0;
    return sum + qty * price;
  }, 0);
}
