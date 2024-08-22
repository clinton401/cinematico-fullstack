import React from "react";

function LazyImages({ imageUrl, title, styles }) {
    return <img src={imageUrl} className={styles} loading="lazy" alt={`${title} image`}/>;
}

export default LazyImages;
