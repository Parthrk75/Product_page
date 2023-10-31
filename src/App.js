import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All'); // Initial category is 'All'

  useEffect(() => {
    const productOptions = { method: 'GET', url: 'https://fakestoreapi.com/products' };
    const categoryOptions = { method: 'GET', url: 'https://fakestoreapi.com/products/categories' };

    axios.all([axios.request(productOptions), axios.request(categoryOptions)])
      .then(axios.spread((productsResponse, categoriesResponse) => {
        setProducts(productsResponse.data);
        setFilteredProducts(productsResponse.data);
        setCategories(['All', ...categoriesResponse.data]); // Include 'All' option
      }))
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    // Filter products based on the selected category
    if (selectedCategory === 'All') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product => product.category === selectedCategory);
      setFilteredProducts(filtered);
    }
  }, [selectedCategory, products]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  }

  return (
    <div>
      <h1>Product List</h1>
      <div>
        <div className="category-buttons">
          {categories.map((category) => (
            <Button  color="blue"
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`mr-4 size="md" color="red" ${selectedCategory === category ? 'selected' : ''}`}
            >
              {category}
            </Button>
            
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {filteredProducts.map((product) => (
          <EcommerceCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

function EcommerceCard({ product }) {
  return (
    <Card className="w-96 m-2">
      <CardHeader shadow={false} floated={false} className="h-96">
        <img
          src={product.image}
          alt="card-image"
          className="h-full w-full object-cover"
        />
      </CardHeader>
      <CardBody>
        <div className="mb-2 flex items-center justify-between">
          <Typography color="blue-gray" className="font-medium">
            {product.title}
          </Typography>
          <Typography color="blue-gray" className="font-medium">
            ${product.price}
          </Typography>
        </div>
        <Typography
          variant="small"
          color="gray"
          className="font-normal opacity-75"
        >
          {product.description}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Button
          ripple={false}
          fullWidth={true}
          className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}

export default App;
