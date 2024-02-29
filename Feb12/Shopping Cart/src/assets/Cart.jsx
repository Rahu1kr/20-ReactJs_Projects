

const ShopingCart = ({visibilty,products,onClose,onProductRemove})=>{
    return(<>
        
         <div className="modal" style={{ display : visibilty ? "block" : "none"}}>
              <div className="shoppingCart">
                 <div className="header">
                    <h2>Shopping Cart</h2>
                    <button className="btn close-btn" onClick={onClose}>X</button>
                 </div>
                 <div className="cart-products">
                         {
                            products.length === 0 ? (
                                 <span>Basket is Empty</span>
                            ):(
                                products.map((product)=>(
                                    <div className="cart-product" key={product.id}>
                                        <img src={product.image}  alt={product.name} />
                                        <div className="product_info">
                                             <h3>{product.name}</h3>
                                             <span> {product.price * product.count} $ </span>
                                        </div>
                                        <button className="btn remove-btn"
                                        onClick={()=> onProductRemove(product)}>
                                            Remove item
                                        </button>
                                    </div>    
                                ))
                            )
                         }
                 </div>
              </div>
         </div>
    
    </>)
}


export default ShopingCart