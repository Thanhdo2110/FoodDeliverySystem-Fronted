import React, { useState } from 'react';
import { assets } from '../../assets/assets';
import { useEffect } from 'react';
import axios from 'axios'; 
import { addFood } from '../../service/FoodService';
import { toast } from 'react-toastify';

const AddFood = () => {
    const [image, setImage] = useState(null); 
    const [data, setData] = useState({
        name: '',
        description: '',
        price: '',
        category: 'Pho'
    });

    const onChangeHandler = (event) => { 
        const name = event.target.name;
        const value = event.target.value;
        setData((data) => ({ ...data, [name]: value }));
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        if (!image) {
            toast.error("Image is required");
            return;
        }

       try {
        await addFood(data, image);
        toast.success("Food added successfully");
        setData({name: '', description: '', price: '', category: 'Pho'});
        setImage(null);
    } catch (error) {

    }
}
    
  return (
   <div className="container mt-2">
        <div className="row ">
            <div className="card col-md-4">
                <div className="card-body">
                    <h2 className="mb-4">Add Food</h2>
                    <form onSubmit={onSubmitHandler}>

                        <div className="mb-3">
                        <label htmlFor="image" className="form-label">
                            <img src={image ? URL.createObjectURL(image) : assets.upload} alt="" width={98} />
                        </label>
                        <input type="file" className="form-control" id="image" required hidden onChange={(e) => setImage(e.target.files[0])}    />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" className="form-control" id="name" required name='name' onChange={onChangeHandler}value={data.name} />
                        </div>
                        
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                          <textarea className="form-control" id="description" rows="5"required name="description" value={data.description} onChange={onChangeHandler}/>

                        </div>

                        <div className="mb-3">
                        <label htmlFor="category" className="form-label">Category</label>
                        <select name="category" id="category" className='form-control' onChange={onChangeHandler} value={data.category}>
                            <option value="Banh Mi">Banh Mi</option>
                            <option value="Cake">Cake</option>
                            <option value="Pho">Pho</option>
                            <option value="Burger">Burger</option>
                            <option value="Pizza">Pizza</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Salad">Salad</option>
                            <option value="Ice cream">Ice cream</option>
                        </select>
                        </div>

                        <div className="mb-3">
                        <label htmlFor="price" className="form-label">Price</label>
                        <input type="number" name="price" id="price" className='form-control' onChange={onChangeHandler} value={data.price} />
                        </div>

                        <button type="submit" className="btn btn-primary">Save</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AddFood;