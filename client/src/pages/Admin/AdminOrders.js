import React, { useState, useEffect } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import AdminMenu from './../../components/Layout/AdminMenu';
import Layout from './../../components/Layout/Layout';
import { useAuth } from "../../context/auth";
import moment from "moment"
import { Select } from 'antd';
const { Option } = Select
const AdminOrders = () => {
    const [status, setStatus] = useState(["Not Processed", "Processing", "Shipped", "Delivered", "Cancelled"])
    const [changestatus, setChangeStatus] = useState("")

    const [orders, setOrders] = useState([]);
    const [auth, setAuth] = useAuth();
    const getOrders = async () => {
        try {
            const { data } = await axios.get('/api/v1/auth/all-orders')
            setOrders(data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (auth?.token) getOrders()
    }, [auth?.token])

    const handleChange = async (orderId, value) => {
        try {
            const { data } = await axios.put(`/api/v1/auth/order-status/${orderId}`, {
                status: value,
            });
            toast.success("Order status updated");
            await getOrders();
        } catch (error) {
            console.log(error);
            toast.error("Failed to update status");
        }
    }
    const handleDelete = async (orderId) => {
        try {

            // if (orders.status !== "Cancelled") {

            //     toast.error("Only cancelled orders can be deleted");
            //     return;
            // }
            const { data } = await axios.delete(`/api/v1/auth/order-delete/${orderId}`);
            toast.success("Order Deleted successfully");
            await getOrders();

        } catch (error) {
            console.log(error);
            toast.error("Failed to delete order");
        }
    }
    return (
        <Layout title={"All Order Data"}>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1 className='text-center'>All Orders</h1>
                        {
                            orders.map((o, i) => {
                                return (
                                    <div className="border shadow" key={i._id}>
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">S NO</th>
                                                    <th scope="col">Status</th>
                                                    <th scope="col">Buyer</th>
                                                    <th scope="col">Date</th>
                                                    <th scope="col">Payment</th>
                                                    <th scope="col">Quantity</th>
                                                    <th scope="col">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>{i + 1}</td>
                                                    <td>
                                                        <Select bordered={false} onChange={(value) => handleChange(o._id, value)} defaultValue={o?.status}>
                                                            {status.map((s, i) => (
                                                                <Option key={i} value={s}>{s}</Option>
                                                            ))}
                                                        </Select>
                                                    </td>
                                                    <td>{o?.buyer.name}</td>
                                                    <td>{moment(o?.createdAt).fromNow()}</td>
                                                    <td>{o?.payment?.success ? "Success" : "Failed"}</td>
                                                    <td>{o?.products?.length}</td>
                                                    <button className='btn btn-danger btn-sm ms-1' onClick={() => handleDelete(o._id)}>Delete Order</button>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div className="container">
                                            {
                                                o.products?.map((p) => (
                                                    <div className="row mb-2 card flex-row" key={p._id}>
                                                        <div className="col-md-2">
                                                            <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top img-fluid" alt={p.name} />
                                                        </div>
                                                        <div className="col-md-8">
                                                            <p>Item Name:{p.name} </p>
                                                            <p>Item Details:{p.description.substring(0, 50)} </p>
                                                            <p>Price: ₹{p.price} </p>

                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default AdminOrders
