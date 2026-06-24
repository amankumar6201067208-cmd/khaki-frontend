import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBlogs } from "../Data/BlogData/BlogContent";

const Blogs = () => {

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {

    const fetchBlogs = async () => {
      const data = await getBlogs();
      setBlogs(data);
    };

    fetchBlogs();

  }, []);

  return (
    <>
      <section className="bg-[url('/src/assets/Background/snow2.png')] ">

        <div className="bg-[url('https://res.cloudinary.com/dsnnuxkfu/image/upload/v1775119294/blog-1_mwjgsw.jpg')] py-20 h-125 bg-center bg-cover bg-no-repeat">
        </div>

        <div className="max-w-285 md:mx-auto space-y-14 flex flex-col gap-40 mx-2.5 pb-16">

          {blogs.map((blog) => (

            <div
              key={blog.id}
              className="bg-white p-6.25 grid md:grid-cols-2 gap-10 shadow-[0px_0px_6px_0px_rgba(0,0,0,0.5)] -mt-42"
            >

              {/* LEFT CONTENT */}

              <div>

                <Link to={`/blog/${blog.slug}`}>
                  <h2 className="text-2xl font-bold mb-2">
                    {blog.title}
                  </h2>
                </Link>

                <p className="text-base text-[#6c757d] mb-2">
                  {new Date(blog.publishDate).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>

                <p className="text-base text-black mb-2">
                  {blog.excerpt}
                </p>

                <Link
                  to={`/blog/${blog.slug}`}
                  className="text-[#9a2100] text-[12px] font-semibold"
                >
                  Continue Reading »
                </Link>

              </div>

              {/* RIGHT IMAGE */}

              <div className="md:flex justify-end hidden">

                <img
                  src={blog.image}
                  alt={blog.title}
                  className="max-h-87.5 object-contain"
                />

              </div>

            </div>

          ))}

        </div>

      </section>
    </>
  );
};

export default Blogs;