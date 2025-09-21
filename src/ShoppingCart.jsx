import React, { useState } from 'react'
//import each picture from assets
import picture1 from "./assets/lap.jpg"
import picture2 from "./assets/mo.jpg"
import picture3 from "./assets/camera.jpg"
import picture4 from "./assets/Tab.jpg"


function ShoppingCart() {

   const[products,setProducts]=useState([]);
   const[name,setName]=useState("");
   const[price,setPrice]=useState("");
   const[quantity,setQuantity]=useState(1)
   const[editIndex,setEditIndex]=useState(null); //Edit
   const[error,setError]=useState("") // For Error msg


  function handleAdd() {
      //Filled or not
      if(!name || !price || !quantity) {
          setError("Please fill all the fields before adding.")
          return;
        }
        setError(""); //Reset


      if(editIndex !== null) {

          //save updated products
          const updatedProducts =[...products];
          updatedProducts[editIndex]= { name: name,
                                        price: price,
                                        quantity: quantity };
         
          setProducts(updatedProducts);
          //Reset
          setEditIndex(null);
        }

      else{
           //add new product
          const newproducts= {name: name,
                              price: price,
                              quantity: quantity};

          setProducts(p => [...p,newproducts])
          }
      
          //reset
          setName("");
          setPrice("");
          setQuantity(1)
  }



  //Update
  function handleUpdate(index){
        const product =products[index];
        setName(product.name)
        setPrice(product.price);
        setQuantity(product.quantity);
        setEditIndex(index);

    }


  //Delete
  function handleDelete(index){
        const deleteProducts=products.filter((product,i)=>i!==index)
        setProducts(deleteProducts)
      }



  //onchange Name,price,Quantity
  function handleProductChange(event){
      setName(event.target.value)
      }

  function handlePriceChange(event){
      setPrice(event.target.value)
      }

  function handleQuantityChange(event){
      setQuantity(event.target.value)
      }



  //calculate total
  function grandTotal(){
      return products.reduce((sum,pdt)=> sum +pdt.price * pdt.quantity ,0);

   }



return (
    <div className='container'>
     
      <h1>Shopping Cart</h1>

       <div className='card-background'>

          {/* Images added */}
            <div className="card">
                  <img className="card-image" src={picture1}alt="Laptop"></img>
                  <h2 className="card-title">Laptop</h2>
                  <p className="card-text" >₹ 69000</p>
                  <p className="card-text" >₹ 86000</p>
            </div>

            <div className="card">
                  <img className="card-image" src={picture2}alt="Mobile"></img>
                  <h2 className="card-title">Mobile</h2>
                  <p className="card-text" >₹ 29000</p>
                  <p className="card-text" >₹ 45000</p>
            </div>

            <div className="card">
                <img className="card-image" src={picture3}alt="Camera"></img>
                <h2 className="card-title">Camera</h2>
                <p className="card-text" >₹ 25000</p>
                <p className="card-text" >₹ 15000</p>
            </div>

            <div className="card">
                <img className="card-image" src={picture4}alt=""></img>
                <h2 className="card-title">Tablet</h2>
                <p className="card-text" >₹ 52000</p>
                <p className="card-text" >₹ 32000</p>     
            </div>
  
            {/* Sentence */}
            <p className='inside-para'>Explore the products, fill in the details, and view your order in the table.</p>
     
       </div>


       <div className='inside-container'>

          <label>Product Details</label> <br /> <br />
          
              <select value={name} onChange={handleProductChange}>
                    <option value="" >-- Select Product --</option>
                    <option value= "Laptop"> Laptop </option>
                    <option value= "Mobile"> Mobile </option>
                    <option value= "Camera"> Camera </option>
                    <option value= "Tablet"> Tablet </option>
              </select>
              <br /><br />

              {/* <input type="text" placeholder='Enter Product Name' value={name} onChange={handleProductChange}/><br /><br /> */}
              <input type="number" placeholder='Enter Product Price'value={price} onChange={handlePriceChange}/> <br /> <br />
              <input type="number" placeholder='No of quantity' value={quantity} onChange={handleQuantityChange}/>
              
              <br /> <br /> <br />
              
              <button className={editIndex !==null? 'save-button':'add-button'} onClick={handleAdd}>  {editIndex !== null ?"Save Product": "Add Products"}  </button>
               
              {/*Error Message Print  */}
              {error && <p className='error'> {error} </p>}     <br />
      
       </div>

          
      {products.length>0 ? (
        <div>
          <h2>Product List</h2>

          <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total Price</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {products.map((product,index)=> (
                  <tr key={index}> 
                    <td>{product.name}</td>
                    <td>₹{product.price}</td>
                    <td>{product.quantity}</td>
                    <td>₹{product.price * product.quantity}</td>

                      <td>
                        <button className="up-button" onClick={()=>handleUpdate(index)}>Update</button>
                        <button className="del-button"onClick={()=>handleDelete(index)}>Delete</button>
                      </td>
                  </tr>))}
              </tbody>

          </table>
    
        <h3 className="h2-last">Grand Total:  ₹{grandTotal()}</h3>
    
    </div> ) : ( <p className="no-products">No products added yet. Please fill the form above.</p>)}

 </div>
  )
}

export default ShoppingCart



//ternery 
//  ?  'yes' : 'no'