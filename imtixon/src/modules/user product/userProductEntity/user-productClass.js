export class UserProductClass {
  constructor(id, userId, productId, count, date, totalPrice, status) {
    this.id = id;
    this.user_id = userId;
    this.product_id = productId;
    this.count = count;
    this.date = date;
    this.total_price = totalPrice;
    this.status = status;
  }
}
