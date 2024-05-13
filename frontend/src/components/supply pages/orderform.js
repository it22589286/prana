import React from 'react'

export default function supplyform() {
  return (
    <div>
      <h1>create purchase order</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="productName">Product Name:</label>
          <input
            type="text"
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="orderId">Order ID:</label>
          <input
            type="text"
            id="orderId"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            required
          />
        </div>
        <div>
          <label htmlFor="unitPrice">Unit Price:</label>
          <input
            type="number"
            id="unitPrice"
            value={unitPrice}
            onChange={(e) => setUnitPrice(parseFloat(e.target.value))}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
