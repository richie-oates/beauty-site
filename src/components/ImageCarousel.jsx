import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { supabase } from "../supabaseClient";

export default function ImageCarousel() {
    const [images, setImages] = useState([]);
    const [fullscreenImage, setFullscreenImage] = useState(null);

    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        async function fetchImages() {
            // Step 1: Query metadata table for visible images
            const { data: visibleImages, error } = await supabase
                .from('example_images_metadata')
                .select('file_name, title')
                .eq('isVisible', true)
                .order('file_name', { ascending: true });

            if (error) {
                console.error('Error fetching visible images:', error.message);
                return;
            }
            console.log(visibleImages);
            // Step 2: Map filenames to public URLs
            const urls = visibleImages.map(img => {
                const { data: { publicUrl } } = supabase
                    .storage
                    .from('example-images')
                    .getPublicUrl(img.file_name);

                return { file_name: img.file_name, url: publicUrl, title: img.title };
            });
            console.log(urls);
            setImages(urls);
        }

        fetchImages();
    }, []);

    const settings = {
        autoplay: true,
        centerMode: true,
        className: "center",
        slidesToShow: 3,
        infinite: true,
        arrows: false,
        swipeToSlide: true,
        focusOnSelect: false,
        responsive: [
            {
                breakpoint: 2100,
                settings: {
                    slidesToShow: 4,
                    initialSlide: 2,
                    dots: true
                }
            },
            {
                breakpoint: 1930,
                settings: {
                    slidesToShow: 3,
                    initialSlide: 2,
                    dots: true
                }
            },
            {
                breakpoint: 1610,
                settings: {
                    slidesToShow: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 1110,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ],

        beforeChange: () => setIsDragging(true),
        afterChange: () => setTimeout(() => setIsDragging(false), 50),
    };

    const handleClick = (url) => {
        if (!isDragging) {
            setFullscreenImage(url);
        }
    };

    return (
        <div>
            <Slider {...settings}>
                {images.map((image, index) => (
                    <div
                        key={index}
                        onClick={() => handleClick(image.url)}
                        // style={{
                        //     height: "50vh",
                        //     width: '90vw',
                        //     max_width: '600px',
                        //     padding: "5px",
                        //     boxSizing: "border-box",
                        // }}
                        className="example-image-container"
                    >
                        <img
                            src={image.url}
                            alt=""
                            // style={{
                            //     width: "100%", // adjust as needed
                            //     borderRadius: "10px",
                            //     objectFit: "contain",
                            //     display: "block",
                            // }}
                            className="example-image"
                        />
                    </div>
                ))}
            </Slider>

            {fullscreenImage && (
                <div
                    onClick={() => setFullscreenImage(null)}
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100vw",
                        height: "100vh",
                        backgroundColor: "rgba(0,0,0,0.9)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 9999,
                    }}
                >
                    <img
                        src={fullscreenImage}
                        alt=""
                        style={{
                            maxWidth: "90%",
                            maxHeight: "90%",
                            objectFit: "contain",
                        }}
                    />
                </div>
            )}
        </div>
    );
}
