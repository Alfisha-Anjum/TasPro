

"use client";
import SidebarCard from "@/components/ui/SidebarCard";
import Image from "next/image";
import BlogSlider from "@/components/ui/BlogSlider";
import { useState, useEffect } from "react";
import BlogCard from "@/components/BlogCards";
import BlogDetail from "@/components/BlogDetail";
import { useRouter } from "next/navigation";
import axios from "axios";

type SidebarCardProps = {
  title: string;
  description?: string;
  buttonText?: string;
  onClick?: () => void;
  variant?: "orange" | "gray";
  image?: string;
  buttonClassName?: string;
  imageClassName?: string;
};

type Blog = {
  category: string;
  title: string;
  description: string;
  date: string;
  image: string;
};

export default function BlogPage() {
  const [currentPage, setCurrentPage] = useState(2);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
const [blogData, setBlogData] = useState<Blog[]>([]);
const [blogLoading, setBlogLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
  const fetchBlogs = async () => {
    try {
      setBlogLoading(true);

      const res = await axios.get(
        `https://app.tasprocompany.in/api/blogs?page=${currentPage}`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      console.log("BLOG API:", res.data);

      if (res.data?.status) {
        const apiBlogs = res.data.data.data.map((item: any) => ({
          id: item.id,
          category: item.blog_category?.name || "Uncategorized",
          title: item.title,
          description: item.description?.replace(/<[^>]*>/g, "") || "",
          date: item.date,
          image: item.image_url || "/img/officeview.png",
        }));

        setBlogData(apiBlogs);
      }
    } catch (error: any) {
      console.log("BLOG API ERROR:", error?.response?.data || error);
    } finally {
      setBlogLoading(false);
    }
  };

  fetchBlogs();
}, [currentPage]);

  useEffect(() => {
  const fetchBlogCategories = async () => {
    try {
      const res = await axios.get(
        "https://app.tasprocompany.in/api/blog-categories",
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      console.log("BLOG CATEGORY API:", res.data);

      if (res.data?.status) {
        const apiCategories = res.data.data.map(
          (item: any) => item.name
        );

        setCategories(["All", ...apiCategories.slice(0, 5)]);
      }
    } catch (error: any) {
      console.log(
        "BLOG CATEGORY ERROR:",
        error?.response?.data || error
      );
    }
  };

  fetchBlogCategories();
}, []);

  const sidebarData: SidebarCardProps[] = [
    {
      title: "Looking Job for Technician",
      buttonText: "Apply Now",
      variant: "orange",
      image: "/electrician.png",
      buttonClassName: "bg-orange-500 hover:bg-orange-600 text-white",
      imageClassName: "w-[45%] h-full",
      onClick: () => router.push("/careers"),
    },
    {
      title: "Looking for any service?",
      buttonText: "Visit Site",
      variant: "gray",
      image: "/img/advgirl.png",
      imageClassName: "w-[45%] h-full scale-125",
      buttonClassName: "bg-black hover:bg-gray-800 text-white",
      onClick: () => router.push("/"),
    },
  ];

  // const blogData: Blog[] = [
  //   {
  //     category: "Education",
  //     title: "What is Salary Range?",
  //     description:
  //       "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form variations ...",
  //     date: "27, Oct, 2024",
  //     image: "/img/officeview.png",
  //   },
  //   {
  //     category: "Learn",
  //     title: "What is Salary Range?",
  //     description:
  //       "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form variations ...",
  //     date: "27, Oct, 2024",
  //     image: "/img/officeview.png",
  //   },
  //   {
  //     category: "Learn",
  //     title: "What is Salary Range?",
  //     description:
  //       "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form variations ...",
  //     date: "27, Oct, 2024",
  //     image: "/img/officeview.png",
  //   },
  //   {
  //     category: "Interview",
  //     title: "What is Salary Range?",
  //     description:
  //       "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form variations ...",
  //     date: "27, Oct, 2024",
  //     image: "/img/officeview.png",
  //   },
  //   {
  //     category: "Speaking",
  //     title: "What is Salary Range?",
  //     description:
  //       "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form variations ...",
  //     date: "27, Oct, 2024",
  //     image: "/img/officeview.png",
  //   },
  //   {
  //     category: "Speaking",
  //     title: "What is Salary Range?",
  //     description:
  //       "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form variations ...",
  //     date: "27, Oct, 2024",
  //     image: "/img/officeview.png",
  //   },
  //   {
  //     category: "Learn",
  //     title: "What is Salary Range?",
  //     description:
  //       "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form variations ...",
  //     date: "27, Oct, 2024",
  //     image: "/img/officeview.png",
  //   },
  //   {
  //     category: "Education",
  //     title: "What is Salary Range?",
  //     description:
  //       "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form variations ...",
  //     date: "27, Oct, 2024",
  //     image: "/img/officeview.png",
  //   },

  //   {
  //     category: "Education",
  //     title: "What is Salary Range?",
  //     description:
  //       "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form variations ...",
  //     date: "27, Oct, 2024",
  //     image: "/img/officeview.png",
  //   },
  //   {
  //     category: "Education",
  //     title: "What is Salary Range?",
  //     description:
  //       "There are many variations of passages of Lorem Ipsum available...",
  //     date: "27, Oct, 2024",
  //     image: "/img/officeview.png",
  //   },
  //   {
  //     category: "Education",
  //     title: "Another Blog Post",
  //     description:
  //       "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form variations ...",
  //     date: "27, Oct, 2024",
  //     image: "/img/officeview.png",
  //   },
  //   {
  //     category: "Education",
  //     title: "What is Salary Range?",
  //     description:
  //       "There are many variations of passages of Lorem Ipsum available...",
  //     date: "27, Oct, 2024",
  //     image: "/img/officeview.png",
  //   },
  //   {
  //     category: "Education",
  //     title: "Another Blog Post",
  //     description:
  //       "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form variations ...",
  //     date: "27, Oct, 2024",
  //     image: "/img/officeview.png",
  //   },
  // ];

const [categories, setCategories] = useState<string[]>(["All"]);

const selectedBlogs =
  selectedCategory === "All"
    ? blogData
    : blogData.filter((blog) => blog.category === selectedCategory);

const totalPages = 1;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen py-10 px-4">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row">
        {/* LEFT - BLOGS */}
        <div className="w-full">
          {selectedBlog && (
            <div className="w-full h-[350px] relative">
              <Image
                src="/img/learning.png"
                alt="Learning"
                fill
                className="object-cover"
              />
            </div>
          )}

          <div className="w-full flex flex-col md:flex-row lg:gap-8">
            {/* LEFT */}
            <div className="w-full md:w-[65%]">
              {selectedBlog ? (
                <>
                  <BlogDetail
                    blog={selectedBlog}
                    onBack={() => setSelectedBlog(null)}
                  />

                  <div className="md:mt-10">
                    <BlogSlider
                      title="Related Blogs"
                      subtitle="There are many variations of passages of Lorem Ipsum"
                    />
                  </div>
                </>
              ) : (
                <>
                 

                  {selectedBlogs.map((card, i) => (
                    <BlogCard
                      key={i}
                      {...card}
                      onReadMore={() => setSelectedBlog(card)}
                    />
                  ))}

                  {/* PAGINATION */}
                  <div className="flex items-center gap-4 mt-10">
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      className="w-10 h-10 flex items-center justify-center rounded-full border border-orange-400 text-orange-500"
                    >
                      {"<"}
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (num) => (
                        <button
                          key={num}
                          onClick={() => setCurrentPage(num)}
                          className={`text-lg font-medium ${
                            currentPage === num
                              ? "text-orange-500"
                              : "text-gray-800"
                          }`}
                        >
                          {num}
                        </button>
                      ),
                    )}
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      className="w-10 h-10 flex items-center justify-center rounded-full border border-orange-400 text-orange-500"
                    >
                      {">"}
                    </button>
                  </div>
                </>
              )}
            </div>

            <aside className="w-full lg:w-[35%] lg:min-w-[320px] space-y-6 self-start lg:mt-20 sticky lg:top-20 p-4">
              {/* Categories */}
              <div className="bg-white p-6 rounded-md">
                <h3 className="text-lg font-semibold mb-4 text-gray-900 pb-2">
                  Categories
                </h3>

                <ul className="space-y-2 text-sm text-gray-600">
                  {categories.map((item, index) => (
                    <li
                      key={item}
                      onClick={() => {
                        setSelectedCategory(item);
                        setCurrentPage(1);
                      }}
                      className={`cursor-pointer font-medium py-1 transition ${
                        selectedCategory === item
                          ? "text-orange-500 font-semibold"
                          : "hover:text-orange-500"
                      }`}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Sidebar Cards */}
              {sidebarData.map((card, i) => (
                <SidebarCard key={i} {...card} />
              ))}
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
