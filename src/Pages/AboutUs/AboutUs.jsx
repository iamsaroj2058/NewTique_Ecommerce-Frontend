import React, { useEffect, useState } from "react";
import axios from "axios";
import DOMPurify from "dompurify";
import Header from "../../Section/Navbar/Header";
import Topheader from "../../Section/Navbar/Topheader";
import Footer from "../../Section/Footer/footer";

const AboutUs = () => {
  const [pageData, setPageData] = useState({
    title: "About Us",
    content: "",
    // last_updated: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/about-us/");
        setPageData({
          title: response.data.title || "About Us",
          content: response.data.content || "",
          last_updated: response.data.last_updated || "",
        });
      } catch (err) {
        setError(err.message);
        console.error("Error fetching about page:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  const sanitizeContent = (html) => {
    const withFullSize = html.replace(
      /<img /g,
      '<img style="width:100%!important; height:500px!important; object-fit:cover!important;" '
    );
    return { __html: DOMPurify.sanitize(withFullSize) };
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-500">
        Error: {error}. Please try again later.
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Topheader />
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-7xl bg-white rounded-r-3xl">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            {pageData.title}
          </h1>

          <div
            className="prose max-w-none ck-content"
            dangerouslySetInnerHTML={sanitizeContent(pageData.content)}
          />

          {/* {pageData.last_updated && (
            <div className="mt-6 text-sm text-gray-500">
              Last updated:{" "}
              {new Date(pageData.last_updated).toLocaleDateString()}
            </div>
          )} */}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AboutUs;
