import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

function ExampleImages() {
    const [images, setImages] = useState([]);
    const [fullScreenImage, setFullScreenImage] = useState(null);

    useEffect(() => {
        async function fetchImages() {
            const { data, error } = await supabase.storage.from('example-images').list('', {
                limit: 10,
                offset: 0,
                sortBy: { column: 'name', order: 'asc' }
            });

            if (error) {
                console.error('Error fetching images:', error.message);
                return;
            }
            else console.log('Files:', data);

            const urls = data.map(file => {
                const { data: { publicUrl } } = supabase
                    .storage
                    .from('example-images')
                    .getPublicUrl(file.name);
                return { name: file.name, url: publicUrl };
            });

            console.log(urls);

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
                        key={img.name}
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
