import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function AdminImages() {
    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [newTitle, setNewTitle] = useState("");
    const [newVisibility, setNewVisibility] = useState(true);
    const [newFile, setNewFile] = useState(null);

    // Fetch images & metadata
    useEffect(() => {
        async function fetchImages() {
            const { data: files, error } = await supabase.storage
                .from("example-images")
                .list("", { limit: 100 });

            if (error) {
                console.error(error);
                return;
            }

            const urls = files.map((file) => ({
                name: file.name,
                url: supabase.storage.from("example-images").getPublicUrl(file.name).data.publicUrl,
            }));

            // Retrieve metadata (titles, visibility) from separate table (or from file name convention)
            const { data: metadata } = await supabase
                .from("example_images_metadata")
                .select("*");

            const enriched = urls.map((img) => {
                const meta = metadata?.find((m) => m.file_name === img.name);
                return {
                    ...img,
                    title: meta?.title || "",
                    isVisible: meta?.isVisible ?? true,
                    id: meta?.id, // store metadata row id
                };
            });

            setImages(enriched);
        }

        fetchImages();
    }, []);

    // Delete image
    const deleteImage = async (img) => {
        if (!confirm(`Are you sure you want to delete "${img.name}"?`)) return;

        await supabase.storage.from("example-images").remove([img.name]);

        // Also remove metadata
        if (img.id) {
            await supabase.from("example_images_metadata").delete().eq("id", img.id);
        }

        setImages(images.filter((i) => i.name !== img.name));
    };

    // Update metadata
    const updateMetadata = async (img) => {
        if (!img.id) {
            // Insert new metadata row
            const { data, error } = await supabase.from("example_images_metadata").insert([
                {
                    file_name: img.name,
                    title: newTitle,
                    isVisible: newVisibility,
                },
            ]);
            if (error) console.error(error);
        } else {
            // Update existing metadata
            const { error } = await supabase
                .from("example_images_metadata")
                .update({
                    title: newTitle,
                    isVisible: newVisibility,
                })
                .eq("id", img.id);
            if (error) console.error(error);
        }

        // Refresh locally
        setImages(
            images.map((i) =>
                i.name === img.name ? { ...i, title: newTitle, isVisible: newVisibility } : i
            )
        );
        setSelectedImage(null);
    };

    // Upload new image
    const uploadNewImage = async () => {
        if (!newFile) return alert("Please select a file!");

        const fileName = `${Date.now()}_${newFile.name}`;
        const { error: uploadError } = await supabase.storage
            .from("example-images")
            .upload(fileName, newFile);

        if (uploadError) {
            console.error(uploadError);
            return;
        }

        // Insert metadata row
        const { error: metaError } = await supabase.from("example_images_metadata").insert([
            {
                file_name: fileName,
                title: newTitle,
                isVisible: newVisibility,
            },
        ]);

        if (metaError) console.error(metaError);

        // Refresh list
        location.reload();
    };

    return (
        <div>
            <h2>Admin Example Images</h2>

            <div style={{ marginBottom: "1rem" }}>
                <h3>Upload New Image</h3>
                <input type="file" onChange={(e) => setNewFile(e.target.files[0])} />
                <input
                    type="text"
                    placeholder="Title"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                />
                <label>
                    <input
                        type="checkbox"
                        checked={newVisibility}
                        onChange={(e) => setNewVisibility(e.target.checked)}
                    />
                    Visible?
                </label>
                <button onClick={uploadNewImage}>Upload</button>
            </div>

            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    flexWrap: "wrap",
                    gap: "10px",
                }}
            >
                {images.map((img) => (
                    <div
                        key={img.name}
                        style={{
                            width: "150px",
                            textAlign: "center",
                        }}
                    >
                        <img
                            src={img.url}
                            alt={img.name}
                            style={{
                                width: "100%",
                                height: "150px",
                                objectFit: "cover",
                                borderRadius: "8px",
                                cursor: "pointer",
                            }}
                            onClick={() => setSelectedImage(img)}
                        />
                        <p>{img.title}</p>
                        <button onClick={() => deleteImage(img)}>Delete</button>
                    </div>
                ))}
            </div>

            {/* Fullscreen / edit */}
            {selectedImage && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100vw",
                        height: "100vh",
                        backgroundColor: "rgba(0,0,0,0.9)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 9999,
                    }}
                    onClick={() => setSelectedImage(null)}
                >
                    <img
                        src={selectedImage.url}
                        alt=""
                        style={{
                            maxWidth: "80%",
                            maxHeight: "80%",
                            borderRadius: "8px",
                        }}
                    />
                    <div
                        style={{
                            background: "#fff",
                            padding: "1rem",
                            borderRadius: "8px",
                            marginTop: "1rem",
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <input
                            type="text"
                            placeholder="Title"
                            value={newTitle || selectedImage.title}
                            onChange={(e) => setNewTitle(e.target.value)}
                        />
                        <label>
                            <input
                                type="checkbox"
                                checked={newVisibility ?? selectedImage.isVisible}
                                onChange={(e) => setNewVisibility(e.target.checked)}
                            />
                            Visible?
                        </label>
                        <button onClick={() => updateMetadata(selectedImage)}>Save</button>
                        <button onClick={() => setSelectedImage(null)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}