
import { useEffect, useState } from "react"
import Navbar from "./Navbar"
import products from "./data"
import ShopingCart from "./Cart"

const MyShop = ()=>{
  
  const [cartsVisibility, setCartVisible] = useState(false); // Set initial visibility to false

  const [productInCart,setProducts] = useState(
    JSON.parse(localStorage.getItem('myshoping-t')) || []
  )
  useEffect(()=>{
    localStorage.setItem('myshoping-t', JSON.stringify(productInCart))
  },[productInCart])

  // add product to cart 

  const addProductToCart = (product)=>{
    const newProduct = {
       ...product,
       count:1,
    }
    setProducts([...productInCart,newProduct])
  }

//  remove item 

const onProductRemove  = (productToRemove) =>{
   const updateCart = productInCart.filter((product)=> product.id !== productToRemove.id)
   setProducts(updateCart)
}


     return(<>

         <ShopingCart  visibilty={cartsVisibility} products={productInCart} 
           onProductRemove = {onProductRemove}
            onClose = {()=> setCartVisible(false)}
             />
  
       <Navbar productInCart={ productInCart}  setCartVisible={setCartVisible} />
       <h1 className="title">My Shop</h1>
        <main>
        <div className="products">
         {
           products.map((product)=>(
             <div className="product" key={product.id}>
              <img src={product.image} alt={product.name} />
              <h4 className="product-name">{product.name}</h4>
              <span className="product-price">{product.price}$</span>
               <div className="button">
                   <button onClick={()=>addProductToCart(product)}>Add To Cart</button>
                </div>
             </div> 
           ))
         }
       </div>
        </main>
     </>)

}

export default MyShop