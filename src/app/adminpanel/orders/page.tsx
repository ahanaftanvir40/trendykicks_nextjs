'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import userPlaceholder from '../../assets/user.png'
import Image from 'next/image'




function OrderPage() {

  const [pendingOrder, setPendingOrder] = useState<any[]>([])
  const [deliveredOrder, setDeliveredOrder] = useState<any[]>([])

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await axios.get('/api/admin/getorder')
      console.log("Pending Orders:", response.data.Pending);
      setPendingOrder(response.data.Pending)

    }
    fetchOrders()
  }, [])

  useEffect(() => {
    const DeliveredOrders = async () => {
      const response = await axios.get('/api/admin/getorder/delivered' , { headers: { 'Cache-Control': 'no-cache' } })
      console.log("Delivered Orders:", response.data.Delivered)
      setDeliveredOrder(response.data.Delivered)
    }
    DeliveredOrders()
  }, [])

  const handleStatusChange = async (OrderId: string, NewStatus: string) => {
    const response = await axios.post('/api/admin/status', { OrderId, NewStatus })

    if (response.data.success) {
      const response = await axios.get('/api/admin/getorder' , { headers: { 'Cache-Control': 'no-cache' } })
      setPendingOrder(response.data.Pending)

      const deliveredResponse = await axios.get('/api/admin/getorder/delivered' , { headers: { 'Cache-Control': 'no-cache' } })
      setDeliveredOrder(deliveredResponse.data.Delivered)
      toast.success('Status Updated')

    }
  }




  return (
    <div className='min-h-screen bg-black py-12 pt-36 text-white'>
      {pendingOrder.length === 0 ? (
        <div className='flex justify-center items-center mt-20'>
          <h1 className='text-white/80 text-4xl'>There is no pending orders.</h1>
        </div>
      ) : (
        <div>
          <div className='flex justify-center items-center mt-10 mb-10'>
            <div className='p-2 shadow-md shadow-zinc-700 border border-zinc-600 rounded-lg'>
              <h1 className='text-white/90 text-4xl'>Pending Orders</h1>

            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead className='text-white'>
                <tr>
                  <th>
                    <label>
                      <input type="checkbox" className="checkbox" />
                    </label>
                  </th>
                  <th>Customer</th>
                  <th>Product</th>
                  <th>Address</th>
                  <th>Order Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {pendingOrder.map((item: any) => (
                  <tr key={item._id}>
                    <th>
                      <label>
                        <input type="checkbox" className="checkbox" />
                      </label>
                    </th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <Image
                              src={userPlaceholder}
                              alt="Avatar Tailwind CSS Component" />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{item.customer.username}</div>
                          <div className="text-sm opacity-50">{item.customer.email}</div>
                        </div>
                      </div>
                    </td>
                    {item.products.map((product: any) => (
                      <td className='text-lg' key={product._id}>
                        {product.name}
                        <br />
                        <span className="badge badge-ghost badge-lg">Size: {product.size} Variant: {product.color}</span>
                      </td>
                    ))}

                    <td >{item.shippingAddress}</td>
                    <td>{new Date(item.orderDate).toLocaleString()}</td>
                    <th>
                      <select name="" id="" className='text-white select bg-zinc-700 rounded-md ' value={item.status} onChange={(e) => handleStatusChange(item._id, e.target.value)}>
                        <option value="Pending" className=''>Pending</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </th>
                  </tr>
                ))}


              </tbody>

            </table>
          </div>
        </div>
      )}


      <div className='flex justify-center items-center mt-28'>
        <div className='p-2 shadow-md shadow-zinc-700 border border-zinc-600 rounded-lg'>
          <h1 className='text-white/90 text-4xl'>Delivered Orders</h1>

        </div>
      </div>
      <div className="overflow-x-auto mt-10">
        <table className="table">
          {/* head */}
          <thead className='text-white'>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Customer</th>
              <th>Product</th>
              <th>Address</th>
              <th>Order Date</th>
              <th>Status</th>

            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {deliveredOrder.map((item: any) => (
              <tr key={item._id}>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <Image
                          src={userPlaceholder}
                          alt="Avatar Tailwind CSS Component" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{item.customer.username}</div>
                      <div className="text-sm opacity-50">{item.customer.email}</div>
                    </div>
                  </div>
                </td>
                {item.products.map((product: any) => (
                  <td className='text-xl' key={product._id}>
                    {product.name}
                    <br />
                    <span className="badge badge-ghost badge-lg">Size: {product.size} Variant: {product.color}</span>
                  </td>
                ))}


                <td >{item.shippingAddress}</td>
                <td>{new Date(item.orderDate).toLocaleString()}</td>
                <th>
                  <select name="" id="" className='select select-success bg-zinc-700 rounded-md ' value={item.status} onChange={(e) => handleStatusChange(item._id, e.target.value)} disabled>
                    <option value="Pending" className=''>Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </th>
              </tr>
            ))}


          </tbody>

        </table>
      </div>



    </div>
  )
}

export default OrderPage
