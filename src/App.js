import React from "react";
import { useState } from "react";

const data = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
];

export default function App() {
  return <FilterableProductTable products={data} />;
}

function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);

  return <main>
    <SearchBar
      filterText={filterText}
      inStockOnly={inStockOnly}
      onFilterTextChange={setFilterText}
      onInStockOnlyChange={setInStockOnly} />
    <ProductTable
      filterText={filterText}
      inStockOnly={inStockOnly}
      products={products} />
  </main>;
}

function SearchBar({ filterText, inStockOnly, onFilterTextChange, onInStockOnlyChange }) {
  return <form>
    <input
      type="text"
      value={filterText}
      onChange={(e) => onFilterTextChange(e.target.value)}
      placeholder="Search..." />
    <br />
    <label htmlFor="inStock">
      <input
        type="checkbox"
        checked={inStockOnly}
        onChange={() => onInStockOnlyChange(!inStockOnly)} />
      {' '}
      Only show products in stock
    </label>
  </form>
}

function ProductTable({ products, filterText, inStockOnly }) {
  const fruits = products.filter(product => product.category==='Fruits');
  const vegetables = products.filter(product => product.category==='Vegetables');
  return <div>
    <div style={{ display: "flex", gap: "5em" }}>
      <h4>Name</h4>
      <h4>Price</h4>
    </div>
    <ProductCategoryRow category={'Fruits'} />
    {fruits.map(fruit => 
      fruit.name.toLowerCase().search(filterText.toLowerCase()) === -1 ? ''
      : ((!fruit.stocked && inStockOnly) ? ''
      : <ProductRow key={fruit.name} product={ fruit }/> ))}
    <ProductCategoryRow category={'Vegetables'} />
    {vegetables.map(vegetable =>
      vegetable.name.toLowerCase().search(filterText.toLowerCase()) === -1 ? ''
      : ((!vegetable.stocked && inStockOnly) ? ''
      : <ProductRow key={vegetable.name} product={ vegetable }/> ))}
  </div>
}

function ProductCategoryRow({ category }) {
  return <h4 style={{ textAlign: "center"}}>{ category }</h4>
}

function ProductRow({ product }) {
  return <div className='productRow'>
    <p style={{ color: product.stocked ? '' : 'red'}}>{ product.name }</p>
    <p>{ product.price }</p>
  </div>
}