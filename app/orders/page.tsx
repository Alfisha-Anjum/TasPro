"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Package, Calendar, MapPin, Clock, Star, IndianRupee } from "lucide-react";
import Swal from "sweetalert2";
const OrdersPage = () => {
  const { user } = useAuth();
  
  // Mock order data
  const orders = [
    {
      id: "ORD-001",
      service: "AC Installation",
      date: "15 Jan 2024",
      status: "Completed",
      amount: 2499,
      rating: 5,
      address: "123 Main Street, City Center"
    },
    {
      id: "ORD-002",
      service: "Plumbing Repair",
      date: "22 Jan 2024",
      status: "In Progress",
      amount: 1299,
      rating: 0,
      address: "456 Park Avenue, Downtown"
    },
    {
      id: "ORD-003",
      service: "Electrician Service",
      date: "28 Jan 2024",
      status: "Scheduled",
      amount: 1899,
      rating: 0,
      address: "789 Oak Street, Suburb"
    },
    {
      id: "ORD-004",
      service: "Home Painting",
      date: "05 Feb 2024",
      status: "Cancelled",
      amount: 5499,
      rating: 0,
      address: "321 Elm Road, Garden Area"
    }
  ];

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please Login to View Orders</h2>
          <a href="/login" className="text-orange-600 font-medium hover:underline">
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
          <p className="text-gray-600">Track and manage your service orders</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">{order.service}</h3>
                    <p className="text-gray-500 text-sm">Order ID: {order.id}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                    order.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                    order.status === 'Scheduled' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {order.status}
                  </span>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>{order.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <IndianRupee className="w-4 h-4" />
                    <span>₹{order.amount}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{order.address}</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100">
                  {order.status === 'Completed' && order.rating > 0 ? (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < order.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                      <button onClick={() => alert(`Viewing details for order ${order.id}`)} className="text-orange-600 text-sm font-medium">View Details</button>
                    </div>
                  ) : order.status === 'In Progress' ? (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-orange-600 text-sm">
                        <Clock className="w-4 h-4 mr-1" />
                        Technician on the way
                      </div>
                      <button onClick={() => alert(`Tracking order ${order.id}`)} className="text-orange-600 text-sm font-medium">Track Order</button>
                    </div>
                  ) : order.status === 'Scheduled' ? (
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">Scheduled for service</div>
                      <button onClick={() => alert(`Viewing details for order ${order.id}`)} className="text-orange-600 text-sm font-medium">View Details</button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500">Order cancelled</div>
                      <button onClick={() => alert(`Viewing details for order ${order.id}`)} className="text-orange-600 text-sm font-medium">View Details</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {orders.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">No orders yet</h3>
            <p className="text-gray-500">Start by booking a service from our catalog</p>
            <a href="/services" className="mt-4 inline-block text-orange-600 font-medium hover:underline">
              Browse Services
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;