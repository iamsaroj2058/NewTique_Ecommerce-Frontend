import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Button, Skeleton } from "antd";
import { CardFirst } from "../../Components/Card/cardFirst";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Recommendations = ({
  title = "Recommended For You",
  algorithm = "hybrid",
  initialCount = 5,
}) => {
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("http://127.0.0.1:8000/api/recommendations/", {
          params: {
            n: 20,
            algorithm,
          },
        });

        const recommendationsWithRatings = response.data.recommendations.map((item) => ({
          ...item,
          average_rating: item.average_rating || 0,
          reviews_count: item.reviews_count || 0,
          image: item.image && item.image !== "null" ? item.image : null,
        }));

        setRecommendations(recommendationsWithRatings);
      } catch (error) {
        console.error("Recommendations error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendations();
  }, [algorithm]);

  const toggleShowAll = () => setShowAll(!showAll);

  const handleProductClick = useCallback(
    (productId) => {
      axios
        .post("http://127.0.0.1:8000/api/interactions/", {
          product_id: productId,
          interaction_type: "view",
        })
        .catch(console.error);

      navigate(`/product/${productId}`);
    },
    [navigate]
  );

  const recommendationCards = useMemo(() => {
    return recommendations
      .slice(0, showAll ? recommendations.length : initialCount)
      .map((item) => (
        <div key={item.id} className="w-full">
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
      ));
  }, [recommendations, showAll, initialCount, handleProductClick]);

  return (
    <div className="w-full px-4 py-10">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[...Array(initialCount)].map((_, i) => (
            <div key={i} className="w-full">
              <Skeleton active paragraph={{ rows: 3 }} />
            </div>
          ))}
        </div>
      ) : recommendations.length > 0 ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {recommendationCards}
          </div>

          {recommendations.length > initialCount && (
            <div className="flex justify-center mt-10">
              <Button type="primary" onClick={toggleShowAll}>
                {showAll ? "Show Less" : "View More Recommendations"}
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-8">
          <p>No recommendations available</p>
          <Button
            type="primary"
            className="mt-4"
            onClick={() => navigate("/products")}
          >
            Browse Products
          </Button>
        </div>
      )}
    </div>
  );
};

export default Recommendations;
