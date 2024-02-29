

const Navbar = ({productInCart,setCartVisible})=>{
     return(<>
         <div className="navbar">
             <h3 className="logo">Logo</h3>
             <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/shop">Shop</a></li>
             </ul>
             <button className="btn shoping-cart-btn" onClick={()=>setCartVisible(true)} >
                 {productInCart.length > 0 &&(
                   <span>{productInCart.length}</span>
                 )}
                 
                
             </button>
         </div>
     </>)
}

export default Navbar