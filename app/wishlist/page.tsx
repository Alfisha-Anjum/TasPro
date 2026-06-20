"use client";

import { ArrowLeft, Heart, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { useBooking } from "@/context/BookingContext";

export default function WishlistPage() {
  const router = useRouter();

  const [wishlist, setWishlist] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useBooking();

  const getSlugUrl = (item: any) => {
    const serviceId = item.service_id || item.service?.id || item.category_id;
    const slug = item.slug || item.service_slug || "ac-repair";

    return `/service/${slug}?service_id=${serviceId}`;
  };

  const handleAddToCart = (item: any) => {
    addToCart({
      id: getWishId(item),
      name: item.title || item.name,
      subService: item.title || item.name,
      serviceName: item.service_name,

      price: Number(item.price || item.sale_price || item.final_price || 0),
      discountedPrice: Number(
        item.price || item.sale_price || item.final_price || 0,
      ),
      originalPrice: Number(
        item.oldPrice || item.original_price || item.strike_price || 0,
      ),
      quantity: 1,

      service_id: Number(item.service_id || item.service?.id),
      service_issue_id: getWishId(item),
      service_sub_category_id:
        item.sub_category_id || item.service_sub_category_id,
    } as any);

    router.push(getSlugUrl(item));
  };

const getWishId = (item: any) =>
  Number(
    item.service_issue_id ||
      item.issue_id ||
      item.service_issue?.id ||
      item.issue?.id ||
      item.id,
  );


const toggleWishlist = async (item: any) => {
  const id = getWishId(item);

  // instant UI remove
  setWishlist((prev) => prev.filter((wish) => getWishId(wish) !== id));

  
  // localStorage update for slug page
  const stored = JSON.parse(localStorage.getItem("wishlistItems") || "[]");
  const updatedStored = stored.filter((wishId: any) => Number(wishId) !== id);
  localStorage.setItem("wishlistItems", JSON.stringify(updatedStored));

  // notify other pages
  window.dispatchEvent(new Event("wishlistUpdated"));

  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      `https://app.tasprocompany.in/api/customers/wish-lists/${id}`,
      {},
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.data?.status) {
      fetchWishlist();
    }
  } catch (error: any) {
    console.log("Remove Wishlist Error:", error?.response?.data || error);
    fetchWishlist();
  }
};


  const fetchWishlist = async () => {
    try {
      const token = localStorage.getItem("token");


     const response = await axios.get(
       "https://app.tasprocompany.in/api/customers/wish-lists",
       {
         params: {
           state_name: "Chhattisgarh",
           city_name: "Raipur",
         },
         headers: {
           Accept: "application/json",
           Authorization: `Bearer ${token}`,
         },
       },
     );

     
const apiWishlist = response.data?.data || [];
setWishlist(apiWishlist);

const wishlistIds = apiWishlist.map((item: any) =>
  Number(item.service_issue_id || item.id),
);

localStorage.setItem("wishlistItems", JSON.stringify(wishlistIds));
window.dispatchEvent(new Event("wishlistUpdated"));


      setWishlist(response.data?.data || []);
    } catch (error) {
      console.log("Wishlist Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;

 
  return (
    <div className=" max-w-7xl mx-auto">
      <div className="relative flex items-center justify-center sm:mb-10 dark:text-gray-300">
        <button onClick={() => router.back()} className="absolute left-0">
          <ArrowLeft className="w-7 h-7" />
        </button>
        <h1 className="text-2xl font-bold">Wishlist</h1>
      </div>

      {wishlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-6 bg-white rounded-3xl shadow-sm border border-gray-100">
          <img
            src="/pana.png"
            alt="No Wishlist"
            className="w-[220px] h-[220px] object-contain mb-5"
          />

          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Your Wishlist is Empty
          </h2>

          <p className="text-sm text-gray-500 text-center max-w-[320px] leading-6 mb-6">
            Save your favorite services here and book them anytime with just one
            tap.
          </p>

          <button
            onClick={() => router.push("/")}
            className="bg-orange-500 hover:bg-orange-600 transition-all text-white px-6 py-3 rounded-xl font-medium shadow-md"
          >
            Explore Services
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-5">
          {wishlist.map((item) => (
            <div
              key={item.title || item.name}
              className="relative bg-white rounded-2xl shadow-md p-5 overflow-hidden"
            >
              <div className="absolute right-0 top-0 bg-orange-500 text-white text-sm font-bold px-5 py-2 rounded-bl-2xl hidden">
                {item.offer || "15% OFF"}
              </div>
              <div className="flex justify-between items-center mb-4 w-full">
                <span className="text-sm inline-block bg-orange-50 text-orange-500 font-bold px-3 py-2 rounded-lg">
                  {item.warranty ? "30 Days Warranty" : "Service Warranty"}
                </span>
                <button onClick={() => toggleWishlist(item)}>
                  <Heart className="w-7 h-7 fill-red-500 text-red-500" />
                </button>
              </div>
              <div className="flex gap-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-20 rounded-xl object-cover bg-gray-100"
                />

                <div className="flex-1">
                  <h2 className="text-sm font-bold text-black">{item.title}</h2>

                  <div className="flex text-xs items-center gap-1 text-gray-500 mt-1">
                    <Star className="w-4 h-4 fill-orange-500 text-orange-500" />
                    <span>{item.rating || "4.8"}</span>
                    <span>({item.reviews || "3,287"} reviews)</span>
                  </div>

                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-base font-bold">
                      ₹{item.price || item.sale_price}
                    </span>
                    <span className="line-through text-gray-400">
                      ₹{item.oldPrice || item.original_price}
                    </span>
                    <span className="text-gray-500 text-sm">• {item.time}</span>
                  </div>
                </div>
              </div>

              <div
                className="text-gray-500 mt-4 text-sm wishlist-desc"
                dangerouslySetInnerHTML={{
                  __html: item.description || "",
                }}
              />

              <div className="flex items-center justify-between mt-4">
                <button
                  onClick={() => router.push(getSlugUrl(item))}
                  className="text-blue-500 text-sm"
                >
                  More Details
                </button>

                <button
                  onClick={() => handleAddToCart(item)}
                  className="border border-orange-500 text-orange-500 rounded-full px-5 py-1 font-bold"
                >
                  Add
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
