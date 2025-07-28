import React, { useEffect, useState } from "react";
import axios from "axios";
import DOMPurify from "dompurify";
import Header from "../../Section/Navbar/Header";
import Topheader from "../../Section/Navbar/Topheader";
import Footer from "../../Section/Footer/footer";
import {
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  MessageOutlined,
} from "@ant-design/icons";

const ContactUs = () => {
  const [pageData, setPageData] = useState({
    title: "Contact Us",
    content: "",
    address: "",
    phone: "",
    email: "",
    map_embed_code: "",
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitStatus, setSubmitStatus] = useState("");

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/contact-us/"
        );
        setPageData({
          title: response.data.title || "Contact Us",
          content: response.data.content || "",
          address: response.data.address || "",
          phone: response.data.phone || "",
          email: response.data.email || "",
          map_embed_code: response.data.map_embed_code || "",
        });
      } catch (err) {
        setError(err.message);
        console.error("Error fetching contact page:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchContactData();
  }, []);

  const sanitizeContent = (html) => {
    return { __html: DOMPurify.sanitize(html) };
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus("submitting");

    try {
      await axios.post("http://localhost:8000/api/contact/submit/", formData);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      setSubmitStatus("error");
    }
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

      <main className="flex-grow py-12">
        {/* ✅ ONE BIG BOX */}
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-7xl bg-white rounded-3xl shadow-lg">
          <h1 className="text-4xl font-bold text-center mb-8">
            {pageData.title}
          </h1>

          {/* Inside: LEFT + RIGHT */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* LEFT */}
            <div className="flex flex-col justify-between">
              <div>
                {pageData.content && (
                  <div
                    className="prose max-w-none ck-content text-gray-700 mb-6"
                    dangerouslySetInnerHTML={sanitizeContent(pageData.content)}
                  />
                )}

                <div className="space-y-4 text-gray-700">
                  {pageData.phone && (
                    <div className="flex items-start gap-3">
                      <PhoneOutlined className="text-xl text-blue-500 mt-1" />
                      <span className="text-base">{pageData.phone}</span>
                    </div>
                  )}

                  {pageData.email && (
                    <div className="flex items-start gap-3">
                      <MailOutlined className="text-xl text-green-500 mt-1" />
                      <span className="text-base">{pageData.email}</span>
                    </div>
                  )}

                  {pageData.address && (
                    <div className="flex items-start gap-3">
                      <EnvironmentOutlined className="text-xl text-red-500 mt-1" />
                      <span className="text-base">{pageData.address}</span>
                    </div>
                  )}
                </div>
              </div>

              {pageData.map_embed_code && (
                <div
                  className="mt-6 rounded-lg overflow-hidden"
                  dangerouslySetInnerHTML={sanitizeContent(
                    pageData.map_embed_code
                  )}
                />
              )}
            </div>

            {/* RIGHT */}
            <div className="flex flex-col justify-center">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <MessageOutlined /> Ask Us Anything
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-700">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full border rounded px-4 py-2 focus:outline-none focus:ring focus:border-blue-400"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Your Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full border rounded px-4 py-2 focus:outline-none focus:ring focus:border-blue-400"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Your Message</label>
                  <textarea
                    name="message"
                    required
                    rows="4"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full border rounded px-4 py-2 focus:outline-none focus:ring focus:border-blue-400"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={submitStatus === "submitting"}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
                >
                  {submitStatus === "submitting"
                    ? "Sending..."
                    : "Send Message"}
                </button>
              </form>

              {submitStatus === "success" && (
                <div className="mt-4 text-green-600">
                  Message sent successfully!
                </div>
              )}
              {submitStatus === "error" && (
                <div className="mt-4 text-red-600">
                  Something went wrong. Please try again.
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ContactUs;
