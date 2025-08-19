import { useEffect, useState } from "react";

export default function Gallery() {
    const [images, setImages] = useState([]);
    const [lightboxImage, setLightboxImage] = useState(null);

    useEffect(() => {
        console.log("✅ useEffect が実行されました！");

        // ✅ `import.meta.glob()` を使って `src/assets/gallery/` の画像を取得
        const imageFiles = import.meta.glob('/src/assets/gallery/*.{jpg,png,webp}', { eager: true });

        console.log("✅ 取得した画像リスト:", imageFiles);

        // 画像のパスを `/quickframe-css/dist/demo/assets/gallery/` に変換
        const imagePaths = Object.keys(imageFiles).map(path => {
            return path.replace('/src/assets/gallery', '/quickframe-css/dist/demo/assets/gallery'); // ✅ 変換
        });

        console.log("✅ 変換後の画像パス:", imagePaths);

        setImages(imagePaths);
    }, []);

    // ライトボックスを開く
    const openLightbox = (src) => {
        setLightboxImage(src);
        setZIndex("-1");
    };

    // ライトボックスを閉じる
    const closeLightbox = () => {
        setLightboxImage(null);
        setTimeout(() => setZIndex("5"), 300);
    };

    // 背面に回す要素を一括処理
    const setZIndex = (value) => {
        document.querySelectorAll([
            ".sidebar-pane:where(.astro-vrdttmbt)",
            ".header:where(.astro-vrdttmbt)",
            ".right-sidebar:where(.astro-67yu43on)",
            ".right-sidebar-container:where(.astro-67yu43on)",
            "nav:where(.astro-doynk5tl)"
        ]).forEach(el => el && (el.style.zIndex = value));
    };

    return (
        <div>
            <div className="mdx-gallery">
                {images.length > 0 ? (
                    images.map((src, index) => (
                        <img key={index} src={src} alt={`Gallery Image ${index + 1}`} onClick={() => openLightbox(src)} />
                    ))
                ) : (
                    <p>画像が見つかりません。</p>
                )}
            </div>

            {/* ライトボックス */}
            {lightboxImage && (
                <div className="mdx-lightbox show" onClick={closeLightbox}>
                    <img src={lightboxImage} alt="拡大画像" />
                    <button className="close" onClick={closeLightbox}>✖</button>
                </div>
            )}
        </div>
    );
}
