import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import Policy from "../components/Policy";
import RelatedProducts from "../components/RelatedProducts";
import star_icon from "../assets/star_icon.png";
import star_dull_icon from "../assets/star_dull_icon.png";

const Product = () => {
    const { productId } = useParams();
    const { products, currency, addToCart, backendUrl } = useContext(ShopContext);
    const [productData, setProductData] = useState(false);
    const [image, setImage] = useState("");
    const [size, setSize] = useState("");
    const [subcategory, setSubcategory] = useState('')

    const fetchProductData = async () => {
        products.map((item) => {
            if (parseInt(item.id) === parseInt(productId)) {
                setProductData(item);
                setImage(`${backendUrl}${item.images[0].image}`);
                setSubcategory(item.subcategory)
                return null;
            }
        });
    };

    useEffect(() => {
        fetchProductData();
    }, [productId, products]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [productId]);

    return productData ? (
        <div className="bordet-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100 ">
            {/* Product Data */}
            <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row ">
                {/* Product Images */}
                <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
                    <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
                        {productData.images.map((item, index) => (
                            <img
                                onClick={() => setImage(`${backendUrl}${item.image}`)}
                                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                                src={`${backendUrl}${item.image}`}
                                key={index}
                                alt=""
                            />
                        ))}
                    </div>
                    <div className="w-full sm:w-[80%]">
                        <img className="w-full h-auto" src={image} alt="" />
                    </div>
                </div>
                {/* Product Information */}
                <div className="flex-1">
                    <h1 className="font-medium text-2xl mt-2">
                        {productData.name}
                    </h1>
                    <p className="text-sm text-gray-500 mt-2">100% original product.</p>
                    <p className="mt-5 text-3xl font-medium">
                        {currency}
                        {productData.price}
                    </p>
                    <p className="mt-5 text-gray-500 md:w-4/5">
                        {productData.description}
                    </p>
                    <div className="flex flex-col gap-4 my-8">
                        <p>Select Size</p>
                        <div className="flex gap-2">
                            {productData.stock_details.map((detail, index) => (
                                <button
                                    onClick={() => setSize(detail.size)}
                                    className={`border py-2 px-4 bg-gray-100 ${
                                        detail.size === size
                                            ? "border-gray-900"
                                            : ""
                                    }`}
                                    key={index}
                                >
                                    {detail.size}
                                </button>
                            ))}
                        </div>
                    </div>
                    <button
                        onClick={() => addToCart(productData.id, size)}
                        className="bg-black text-white px-8 py-3 active:bg-gray-700"
                    >
                        ADD TO CART
                    </button>
                    <hr className="mt-8 sm:4/5"></hr>
                    <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
                        
                        <Policy />
                    </div>
                </div>
            </div>

            {/* Description & Review Section */}
            <div className="mt-20">
                <div className="flex">
                    <b className="border px-5 py-3 text-sm">Description</b>
                </div>
                <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
                    <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book. It has
                        survived not only five centuries, but also the leap into
                        electronic typesetting, remaining essentially unchanged.
                        It was popularised in the 1960s with the release of
                        Letraset sheets containing Lorem Ipsum passages, and
                        more recently with desktop publishing software like
                        Aldus PageMaker including versions of Lorem Ipsum.
                    </p>
                    <p>
                        It is a long established fact that a reader will be
                        distracted by the readable content of a page when
                        looking at its layout. The point of using Lorem Ipsum is
                        that it has a more-or-less normal distribution of
                        letters, as opposed to using 'Content here, content
                        here', making it look like readable English. Many
                        desktop publishing packages and web page editors now use
                        Lorem Ipsum as their default model text, and a search
                        for 'lorem ipsum' will uncover many web sites still in
                        their infancy. Various versions have evolved over the
                        years, sometimes by accident, sometimes on purpose
                        (injected humour and the like).
                    </p>
                </div>
            </div>

            {/* Display related products */}
            <RelatedProducts subcategory = { subcategory } />
        </div>
    ) : (
        <div className="opacity-0"></div>
    );
};

export default Product;
