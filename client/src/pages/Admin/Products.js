import React, { useEffect, useState } from 'react'
import AdminMenu from '../../components/Layout/AdminMenu'
import Layout from "../../components/Layout/Layout";
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
const Products = () => {
    const [products, setProducts] = useState([])

    //get All Products
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get("/api/v1/product/get-product")
            setProducts(data.products)
        } catch (error) {
            console.log(error);
            toast.error("Something went Wrong");
        }
    }
    useEffect(() => {
        getAllProducts();
    }, []);
    return (
        <Layout title={"Dashboard - Product Details"}>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1 className='text-center'> All Products List</h1>
                        <div className="card-group">
                            {products?.map((p) => (
                                <Link key={p._id} to={`/dashboard/admin/product/${p.slug}`} className='product-link'>
                                    <div className="card m-2" style={{ width: '18rem' }}>
                                        <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top img-fluid" alt={p.name} max-width={"100 %"} height={"auto"} />
                                        <div className="card-body">
                                            <h5 className="card-title">{p.name}</h5>
                                            <p className="card-text">{p.description}</p>

                                        </div>
                                    </div>
                                </Link>

                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Products
