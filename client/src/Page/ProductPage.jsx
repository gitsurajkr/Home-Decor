import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useRouter for navigation
import { Button } from "../components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import decor3 from "../assets/decor/decor3.jpg";

export default function ProductPage() {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [inStock, setInStock] = useState(false);
  const router = useNavigate(); // Initialize useRouter hook for navigation

  // Sample products for the new sections
  const sampleProducts = {
    Bedroom: [
      { id: 1, name: "Cozy Bed", price: 299.99, image: decor3, description: "A cozy bed perfect for any bedroom." },
      { id: 2, name: "Wardrobe", price: 499.99, image: decor3, description: "A spacious wardrobe for your clothes." },
      { id: 3, name: "Wardrobe", price: 499.99, image: decor3, description: "A spacious wardrobe for your clothes." },
      { id: 4, name: "Wardrobe", price: 499.99, image: decor3, description: "A spacious wardrobe for your clothes." },
      { id: 5, name: "Wardrobe", price: 499.99, image: decor3, description: "A spacious wardrobe for your clothes." },
      { id: 6, name: "Wardrobe", price: 499.99, image: decor3, description: "A spacious wardrobe for your clothes." },
      { id: 7, name: "Wardrobe", price: 499.99, image: decor3, description: "A spacious wardrobe for your clothes." },
      { id: 8, name: "Wall Art", price: 79.99, image: decor3, description: "Beautiful artwork to enhance your walls." },



    ],
    DiningRoom: [
      { id: 1, name: "Dining Table", price: 599.99, image: decor3, description: "Stylish dining table to fit any room." },
      { id: 2, name: "Chair Set", price: 199.99, image: decor3, description: "Comfortable and durable chair set." },
      { id: 3, name: "Chair Set", price: 199.99, image: decor3, description: "Comfortable and durable chair set." },
      { id: 4, name: "Chair Set", price: 199.99, image: decor3, description: "Comfortable and durable chair set." },
      { id: 5, name: "Chair Set", price: 199.99, image: decor3, description: "Comfortable and durable chair set." },
      { id: 6, name: "Chair Set", price: 199.99, image: decor3, description: "Comfortable and durable chair set." },
      { id: 7, name: "Chair Set", price: 199.99, image: decor3, description: "Comfortable and durable chair set." },
      { id: 8, name: "Chair Set", price: 199.99, image: decor3, description: "Comfortable and durable chair set." },
    ],
    DrawingRoom: [
      { id: 5, name: "Sofa Set", price: 799.99, image: decor3, description: "Luxurious sofa set for your living room." },
      { id: 6, name: "Coffee Table", price: 299.99, image: decor3, description: "Modern coffee table with a sleek design." },
      { id: 6, name: "Coffee Table", price: 299.99, image: decor3, description: "Modern coffee table with a sleek design." },
      { id: 6, name: "Coffee Table", price: 299.99, image: decor3, description: "Modern coffee table with a sleek design." },
      { id: 6, name: "Coffee Table", price: 299.99, image: decor3, description: "Modern coffee table with a sleek design." },
      { id: 6, name: "Coffee Table", price: 299.99, image: decor3, description: "Modern coffee table with a sleek design." },
      { id: 6, name: "Coffee Table", price: 299.99, image: decor3, description: "Modern coffee table with a sleek design." },
    ],
  };

  const newArrivals = [
    { id: 7, name: "Modern Lamp", price: 99.99, image: decor3, description: "A stylish lamp to brighten up any room." },
    { id: 8, name: "Bookshelf", price: 199.99, image: decor3, description: "Elegant bookshelf to organize your books." },
    { id: 8, name: "Bookshelf", price: 199.99, image: decor3, description: "Elegant bookshelf to organize your books." },
    { id: 8, name: "Bookshelf", price: 199.99, image: decor3, description: "Elegant bookshelf to organize your books." },
    { id: 8, name: "Bookshelf", price: 199.99, image: decor3, description: "Elegant bookshelf to organize your books." },
    { id: 8, name: "Bookshelf", price: 199.99, image: decor3, description: "Elegant bookshelf to organize your books." },
    { id: 8, name: "Bookshelf", price: 199.99, image: decor3, description: "Elegant bookshelf to organize your books." },
  ];

  const bestSellers = [
    { id: 9, name: "Luxury Rug", price: 149.99, image: decor3, description: "High-quality rug to add comfort to your space." },
    { id: 10, name: "Wall Art", price: 79.99, image: decor3, description: "Beautiful artwork to enhance your walls." },
    { id: 10, name: "Wall Art", price: 79.99, image: decor3, description: "Beautiful artwork to enhance your walls." },
    { id: 10, name: "Wall Art", price: 79.99, image: decor3, description: "Beautiful artwork to enhance your walls." },
    { id: 10, name: "Wall Art", price: 79.99, image: decor3, description: "Beautiful artwork to enhance your walls." },
    { id: 10, name: "Wall Art", price: 79.99, image: decor3, description: "Beautiful artwork to enhance your walls." },
    { id: 10, name: "Wall Art", price: 79.99, image: decor3, description: "Beautiful artwork to enhance your walls." },
  ];

  const handleProductClick = (productId) => {
    // Navigate to the product details page
    router.push(`/product/${productId}`);
  };

  const renderProductGrid = (products) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-navyBlue rounded-sm shadow-md overflow-hidden transition-transform hover:scale-105 cursor-pointer"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover"
            onClick={() => handleProductClick(product.id)} // Navigate on image click
          />
          <div className="p-4">
            <h3 className="font-semibold text-headerColour text-lg mb-2 truncate">
              {product.name}
            </h3>
            <p className="text-silver mb-2 line-clamp-2">{product.description}</p>
            <p className="font-bold text-silver">$ {product.price}</p>
            <div className="flex items-center mt-2">
              {/* Rating component */}
              <span className="text-yellow-500 text-sm">★★★★☆</span>
            </div>

            {/* Add Product Button inside each product card */}
            <div className="mt-4">
              <Button
                variant="outline"
                className="bg-navyBlue text-headerColour hover:bg-silver transition-all w-full"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering the onClick of the product image
                  handleAddProduct(product); // Add product to the list or cart
                }}
              >
                Add Product
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );


  return (
    <div className="flex flex-col min-h-screen bg-silver">
      <Header />
      <div className="container mx-auto px-5 py-8 flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full md:w-64 space-y-6 pt-12">
          <div>
            <h2 className="text-lg text-navyBlue font-semibold mb-4">Categories</h2>
            <ul className="space-y-2">
              {["All", "Electronics", "Clothing", "Books", "Home & Garden"].map((category) => (
                <li key={category}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-left text-navyBlue hover:bg-navyBlue hover:text-silver transition-all"
                  >
                    {category}
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-lg text-navyBlue font-semibold mb-4">Price Range</h2>
            <Slider
              min={0}
              max={1000}
              step={10}
              value={priceRange}
              onValueChange={setPriceRange}
              className="mb-3"
            />
            <div className="flex justify-between text-sm text-navyBlue">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Switch
              id="in-stock"
              checked={inStock}
              onCheckedChange={setInStock}
            />
            <Label htmlFor="in-stock" className="text-navyBlue">
              In Stock Only
            </Label>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 pt-12">
          <div className="flex justify-between items-center mb-8">
            <p className="text-navyBlue">Showing 24 of 256 products</p>
            <Select defaultValue="featured">
              <SelectTrigger className="bg-navyBlue text-headerColour w-[180px] hover:bg-opacity-90 transition-all">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-navyBlue text-headerColour">
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="newest">Newest Arrivals</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* New Sections */}
          <section >
            {/* <h2 className="text-2xl font-semibold text-navyBlue mb-6">Shop by Categories</h2> */}
            <div>
              <h3 className="text-xl text-navyBlue mb-4">Bedroom Products</h3>
              {renderProductGrid(sampleProducts.Bedroom)}
            </div>
            <div className="mt-8">
              <h3 className="text-xl text-navyBlue mb-4">Dining Room Products</h3>
              {renderProductGrid(sampleProducts.DiningRoom)}
            </div>
            <div className="mt-8">
              <h3 className="text-xl text-navyBlue mb-4">Drawing Room Products</h3>
              {renderProductGrid(sampleProducts.DrawingRoom)}
            </div>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-semibold text-navyBlue mb-6">New Arrivals</h2>
            {renderProductGrid(newArrivals)}
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-semibold text-navyBlue mb-6">Best Sellers</h2>
            {renderProductGrid(bestSellers)}
          </section>

          {/* Pagination */}
          <div className="mt-8 flex justify-center space-x-4">
            <Button variant="outline" className="hover:bg-navyBlue hover:text-silver">
              Previous
            </Button>
            <Button variant="outline" className="hover:bg-navyBlue hover:text-silver">
              Next
            </Button>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
