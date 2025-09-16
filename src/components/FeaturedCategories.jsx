
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllCatThunk } from "../store/Categories/thunk/getAllCatThunk";

const categories = [
  {
    image: "https://imgs.search.brave.com/FewSCST-gyG0s8fIz-lpl7lxyXrrUdv3ai-2n-WKAVk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9zdHVubmluZy13/b3JsZC1ncmFwaHkt/ZGF5LWltYWdlcy1j/ZWxlYnJhdGluZy1h/cnQtZ3JhcGh5Xzc2/Mjc4NS0yMDMxNDMu/anBnP3NlbXQ9YWlz/X2h5YnJpZCZ3PTc0/MCZxPTgw",
  },
  {
    image: "https://imgs.search.brave.com/2OU-OH4mU2CUpGnv2Z8KfCkAKpkPNM-2-nGnL1ZIlp8/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAwLzYxLzE4LzQy/LzM2MF9GXzYxMTg0/MjA3X1lPZjZXd0tW/MUc1SHNVaVhLYUZx/T01vY1ltR2NIbmpn/LmpwZw",
  },
  {
    image: "https://imgs.search.brave.com/XOMu8bn-fZK7yre6b5EZ54DZFQKFGuKozz0joYmTKHA/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTQ3/Njk3MzAyMC9waG90/by92aWRlby1tYXJr/ZXRpbmctY29uY2Vw/dC13b21hbi1wbGF5/aW5nLXZpZGVvLWNv/bnRlbnQtb25saW5l/LXN0cmVhbWluZy1y/dW5uaW5nLXNob3J0/LWNsaXAtb24uanBn/P3M9NjEyeDYxMiZ3/PTAmaz0yMCZjPW5T/TDFjSjh6Q1NSMWJD/cHgtZHBPZ0p1Q1pV/UHZ2U1FNWTA3dGdz/UnRyc1E9",
  },
  {
    image: "https://imgs.search.brave.com/tsiNq-ZSxMw0PRn0aStVqIKgdBgThiwkVloxPgjytx0/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTI3/MDIxODIxMC9waG90/by9jbG9zZS11cC1j/b21wdXRlci1jb2Rl/LW9uLXNjcmVlbi5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/QUl2bklmWG9Eangt/ZW11OG9rRWtpMTNa/MVpBZ1B1WnFBOFhU/al9hTC1tST0",
  },
  {
    image: "https://imgs.search.brave.com/skaEVQ4L92MTUvDg9waBuZL0CErjayuuidNQDtjgwws/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9idXJz/dC5zaG9waWZ5Y2Ru/LmNvbS9waG90b3Mv/Y3JlYXRpdmUtZGVz/aWduZXJzLWRlc2su/anBnP3dpZHRoPTEw/MDAmZm9ybWF0PXBq/cGcmZXhpZj0wJmlw/dGM9MA"
  },
  {
    image: "https://imgs.search.brave.com/qpZos8r9hOs4iELw0WEoV5CSGMHGFJrNGPiCD7RA39k/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTE0/OTU5NzA3NS9waG90/by9ncmFwaGljLWRl/c2lnbmVyLWRldmVs/b3BtZW50LXByb2Nl/c3MtZHJhd2luZy1z/a2V0Y2gtZGVzaWdu/LWNyZWF0aXZlLWlk/ZWFzLWRyYWZ0LWxv/Z28tcHJvZHVjdC5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/LWRxUUV1LTlockVL/ekEzYi1xbHdvdlpK/OU5qZlJ3M2cxUnIz/Y2U0LTBLVT0"
  }

];


const FeaturedCategories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categories: cat, loading, error } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(getAllCatThunk());
  }, [dispatch]);
  return (
    <section className="py-16 bg-gradient-to-br from-gray-50/80 to-purple-50/60 dark:bg-gradient-to-br dark:from-background dark:to-purple-900/15">
      <div className="container px-4 mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold font-quicksand text-foreground">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-700">
              Explore Categories
            </span>
          </h2>
         
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            // Loading skeleton
            Array.from({ length: 4 }).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <div className="relative h-48 bg-gray-200 dark:bg-gray-700 animate-pulse">
                  <div className="absolute bottom-0 left-0 p-4 w-full">
                    <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
                  </div>
                </div>
              </Card>
            ))
          ) : error ? (
            <div className="col-span-full text-center py-8">
              <p className="text-red-500">Failed to load categories. Please try again.</p>
            </div>
          ) : cat && Array.isArray(cat) && cat.length > 0 ? (
            cat.map((category, i) => (
              <Card
                key={category.id || category.name}
                className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:shadow-purple-200/40 dark:hover:shadow-purple-900/20"
              >
                <div 
                  className="relative h-48 overflow-hidden cursor-pointer" 
                  onClick={() => navigate(`/categories/${category.slug || category.name.toLowerCase().replace(/\s+/g, '-')}/projects`)}
                >
                  <img
                    src={categories[i % categories.length].image}
                    alt={category.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-4">
                    <h3 className="text-xl font-bold text-white mb-2">{category.name}</h3>
                    <p className="text-white/80 text-sm line-clamp-2">{category.description}</p>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-muted-foreground">No categories available.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
