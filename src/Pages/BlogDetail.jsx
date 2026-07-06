import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBlogBySlug } from "../Data/BlogData/BlogDetailsContent";
import { mediaUrl } from "../api/strapi";
import RichTextRenderer from "../Components/RichTextRenderer";

const BlogDetail = () => {

  const { slug } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {

    const fetchBlog = async () => {
      const data = await getBlogBySlug(slug);
      setBlog(data);
    };

    fetchBlog();

  }, [slug]);

  if (!blog) {
    return <p className="text-center py-20">Loading...</p>;
  }

  return (
    <section className="bg-[url('/src/assets/Background/snow2.png')] pt-20">

      <div className="max-w-285 mx-auto px-6 pt-10 md:pt-24 pb-10">

        {/* Title */}

        <h1 className="md:text-[32px] text-[25px] text-[#DB4D27] font-bold mb-2">
          {blog.title}
        </h1>

        {/* Date */}

        <p className="text-sm text-black mb-8">
          <i className="fa-solid fa-calendar text-[#DF1814]"></i>{" "}
          {new Date(blog.publishDate).toLocaleDateString(
            "en-US",
            { month: "long", day: "numeric", year: "numeric" }
          )}
          <i className="fa-regular fa-user text-[#DF1814] ml-2.5"></i>{" "}
          Khaki Tours
        </p>

        <hr className="my-6 border-t border-gray-400/60" />

        {/* Featured Image */}

        {blog.image && (
          <div className="flex justify-center mb-10">
            <img
              src={blog.image}
              alt={blog.title}
              className="max-w-187.5 max-h-187.5"
            />
          </div>
        )}

        <hr className="my-6 border-t border-gray-400/60" />

        {/* Dynamic Content */}

        {blog.content?.map((block, index) => {

          // Paragraph Block — render full Strapi rich-text with formatting
          if (block.__component === "blogs.paragraph") {
            return (
              <RichTextRenderer
                key={index}
                nodes={block.Paragraph}
                className="mb-4 text-black text-base"
              />
            );
          }

          // Image Block
          if (block.__component === "blogs.image") {
            return (
              <div key={index} className="flex justify-center my-8">
                <img
                  src={mediaUrl(block.image?.url)}
                  alt={block.image?.alternativeText || ""}
                  className="max-w-150 max-h-100"
                />
              </div>
            );
          }

          return null;

        })}

        <hr className="my-6 border-t border-gray-400/60" />

      </div>

    </section>
  );
};

export default BlogDetail;