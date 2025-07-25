import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Button, Skeleton, message } from "antd";
import { CardFirst } from "../../Components/Card/cardFirst";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Recommendations = ({
  title = "Recommended For You",
  algorithm = "content-based",
  productId = null,
}) => {
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchRecommendations = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const params = {
        n: 5,
        algorithm,
        ...(productId && { product_id: productId }),
      };

      const response = await axios.get(
        "http://127.0.0.1:8000/api/recommendations/",
        { params, timeout: 10000 }
      );

      if (!response.data?.recommendations) {
        throw new Error("Invalid response format");
      }

      setRecommendations(
        response.data.recommendations.map((item) => ({
          id: item.id,
          name: item.name || "Unnamed Product",
          price: item.price ? Number(item.price) : 0,
          image: item.image && item.image !== "null" ? item.image : null,
          average_rating: item.average_rating ? Number(item.average_rating) : 0,
          reviews_count: item.reviews_count ? Number(item.reviews_count) : 0,
        }))
      );
    } catch (err) {
      console.error("Recommendations error:", err);
      setError(err.message || "Failed to load recommendations");
      message.error("Could not load recommendations");
      setRecommendations([]);
    } finally {
      setIsLoading(false);
    }
  }, [algorithm, productId]);

  useEffect(() => {
    const controller = new AbortController();
    fetchRecommendations();
    return () => controller.abort();
  }, [fetchRecommendations]);

  const handleProductClick = useCallback(
    async (productId) => {
      try {
        await axios.post(
          "http://127.0.0.1:8000/api/interactions/",
          { product_id: productId, interaction_type: "view" },
          { timeout: 5000 }
        );
      } catch (err) {
        console.error("Interaction tracking error:", err);
      }
      navigate(`/product/${productId}`);
    },
    [navigate]
  );

  // Maintains original card sizing in a 5-column grid
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={`skeleton-${i}`} className="w-full">
              <Skeleton active paragraph={{ rows: 3 }} />
            </div>
          ))}
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center py-8">
          <p className="text-red-500">{error}</p>
          <Button
            type="primary"
            className="mt-4"
            onClick={fetchRecommendations}
          >
            Retry
          </Button>
        </div>
      );
    }

    if (recommendations.length === 0) {
      return (
        <div className="text-center py-8">
          <p>No recommendations available</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {recommendations.map((item) => (
          <div key={`product-${item.id}`} className="w-full">
            <CardFirst
              id={item.id}
              productName={item.name}
              price={item.price}
              productImage={item.image}
              average_rating={item.average_rating}
              reviews_count={item.reviews_count}
              onClick={() => handleProductClick(item.id)}
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full px-4 py-10">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>
      {renderContent()}
    </div>
  );
};

export default React.memo(Recommendations);
