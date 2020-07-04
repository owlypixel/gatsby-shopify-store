import React from 'react'
import Image from 'gatsby-image'
import Client from 'shopify-buy'


const Product = ({product}) => {
  
  async function checkout () {
    // build a client
    const client = Client.buildClient({
      storefrontAccessToken: process.env.GATSBY_SHOPIFY_STOREFRONT_TOKEN,
      domain: `${process.env.GATSBY_SHOP_NAME}.myshopify.com`,
    })

    // create a checkout
    const checkout = await client.checkout.create()
    
    // create an array of line items
    const variantId = product.variants[0].shopifyId
    const lineItemsToAdd = [{ variantId, quantity: 1 }]

    // add line items to the checkout
    const checkoutId = checkout.id
    const newCheckout = await client.checkout.addLineItems(
      checkoutId,
      lineItemsToAdd
    )
    
    // finish the checkout by visiting webUrl
    window.open(checkout.webUrl)
  }
  return (
    <div className="product-wrap">
      <Image fixed={product.images[0].localFile.childImageSharp.fixed}/>
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <button onClick={checkout}>Buy for {product.variants[0].priceV2.amount}</button>
    </div>
  )
}

export default Product