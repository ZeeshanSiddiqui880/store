import React from "react";
import { X } from "lucide-react";
import { useGetStoreRatings } from "../../../hooks/owner/useOwner";
 
function ViewDetailsPopup({ isOpen, onClose, store }) {
const { data: responseData } = useGetStoreRatings();

    const actualRatingsArray = responseData?.stores || [];

   const storeRatings = actualRatingsArray.filter(
    (item) => item.storeId === store?.id
  );

  const storeRatingss = store?.raters || [];
   console.log(storeRatingss,"storeRatings");
  
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Store Details</h2>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-5">
          <div>
            <label className="text-sm text-gray-500">Name</label>
            <p className="font-medium">{store?.name || "-"}</p>
          </div>

          <div>
            <label className="text-sm text-gray-500">Email</label>
            <p className="font-medium">{store?.email || "-"}</p>
          </div>

          <div>
            <label className="text-sm text-gray-500">Address</label>
            <p className="font-medium whitespace-pre-wrap">
              {store?.address || "-"}
            </p>
          </div>

          <div>
            <label className="text-sm text-gray-500">Average Rating</label>
            <p className="font-medium">
              {store?.averageRating || "-"}
            </p>
          </div>

          <div className="pt-4 border-t">
            <h3 className="font-semibold text-lg mb-3">
              Users Who Rated This Store
            </h3>

            {storeRatingss?.length > 0 ? (
              <table className="w-full border  overflow-auto">
                <thead>
                  <tr>
                    <th className="p-2 text-left">Name</th>
                    <th className="p-2 text-left">Email</th>
                    <th className="p-2 text-center">Rating</th>
                  </tr>
                </thead>

                <tbody>
                  {storeRatingss?.map((rating) => (
                    <tr key={rating.id} className="border-t" >
                      <td className="p-2">{rating.name}</td>
                      <td className="p-2">{rating.email}</td>
                      <td className="p-2 text-center">
                        {rating.rating}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-500">
                No ratings submitted yet.
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end mt-8">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-md hover:bg-gray-100 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default ViewDetailsPopup;