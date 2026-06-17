import React, { useState } from "react";
import { X, Star } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetStores, useRateStore } from "../../hooks/users/useStores";

function SubmitRating() {
  const [rating, setRating] = useState(0);
  const { storeId } = useParams();
  const { mutate: rateStore, isPending } = useRateStore();
  const {data:stores} = useGetStores();
  const navigate = useNavigate();

  const store = stores?.find((store) => store.id === Number(storeId));

  const userId = localStorage.getItem("userId");

  const handleSaveRating = () => {
    rateStore(
      {
        userId,
        storeId,
        rating,
      },
      {
        onSuccess: () => {
          navigate(-1);
        },
      },
    );
  };

  return (
    <div className="min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Rate Store</h1>

      <div className="space-y-6">
        <div>
          <label className="block text-sm text-gray-500 mb-1">Store Name</label>
          <p className="text-lg font-medium">{store?.name}</p>
        </div>

        <div>
          <label className="block text-sm text-gray-500 mb-1">Email</label>
          <p className="text-lg">{store?.email}</p>
        </div>

        <div>
          <label className="block text-sm text-gray-500 mb-1">Address</label>
          <p className="text-lg">{store?.address}</p>
        </div>

        <div className="pt-4 border-t">
          <label className="block text-sm text-gray-500 mb-4">
            Select Your Rating
          </label>

          <div className="flex gap-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <button key={star} type="button" onClick={() => setRating(star)}>
                <Star
                  size={40}
                  className={`transition ${
                    star <= rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>

          <p className="mt-3 text-gray-600">
            Selected Rating: <span className="font-semibold">{rating}/5</span>
          </p>
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-10">
        <button
          onClick={() => navigate(-1)}
          className="px-5 py-2 border rounded-md cursor-pointer"
        >
          Back
        </button>

        <button
          onClick={handleSaveRating}
          disabled={!rating || isPending}
          className="px-5 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50 cursor-pointer"
        >
          {isPending ? "Saving..." : "Save Rating"}
        </button>
      </div>
    </div>
  );
}

export default SubmitRating;
