import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

function ExampleImages() {
    const [images, setImages] = useState([]);
    const [fullScreenImage, setFullScreenImage] = useState(null);

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

            // Step 2: Map filenames to public URLs
            const urls = visibleImages.map(img => {
                const { data: { publicUrl } } = supabase
                    .storage
                    .from('example-images')
                    .getPublicUrl(img.file_name);

                return { file_name: img.file_name, url: publicUrl, title: img.title };
            });
            setImages(urls);
        }

        fetchImages();
    }, []);

    const handleImageClick = (url) => {
        setFullScreenImage(url);
    };

    const closeFullScreen = () => {
        setFullScreenImage(null);
    };

    return (
        <div>
            <div className="scroll-container">
                {images.map(img => (
                    <img
                        key={img.file_name}
                        src={img.url}
                        alt=""
                        className="thumbnail"
                        onClick={() => handleImageClick(img.url)}
                    />
                ))}
            </div>

            {fullScreenImage && (
                <div className="fullscreen-overlay" onClick={closeFullScreen}>
                    <img src={fullScreenImage} alt="Full Screen" className="fullscreen-image" />
                </div>
            )}
        </div>
    );
}

export default ExampleImages;
