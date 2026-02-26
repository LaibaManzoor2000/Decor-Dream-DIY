export const getSafeImg = (pin, index = 0) => {
    const title = pin?.title?.toLowerCase() || "";

    // We reject low-quality seeds or irrelevant placeholders
    const isValidUrl = pin?.image_url &&
        pin.image_url.startsWith('http') &&
        !pin.image_url.includes('seed') &&
        !pin.image_url.includes('placeholder') &&
        !pin.image_url.includes('buzz') &&
        !pin.image_url.includes('toy');

    if (isValidUrl) return pin.image_url;

    // DEEP RELEVANCE MAPPING (Curated Unsplash)
    const gallery = {
        macrame: "https://images.unsplash.com/photo-1544967008-6f17edc824c6?q=80&w=1200&auto=format&fit=crop",
        plant: "https://images.unsplash.com/photo-1485955900006-10f4d324d446?q=80&w=1200&auto=format&fit=crop",
        desk: "https://images.unsplash.com/photo-1518455027359-f3f816b1a238?q=80&w=1200&auto=format&fit=crop",
        shelf: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1200&auto=format&fit=crop",
        kitchen: "https://images.unsplash.com/photo-1556912177-f547cff96784?q=80&w=1200&auto=format&fit=crop",
        bathroom: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1200&auto=format&fit=crop",
        bedroom: "https://images.unsplash.com/photo-1616137422495-1e9e46e2aa77?q=80&w=1200&auto=format&fit=crop",
        living: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop",
        boho: "https://images.unsplash.com/photo-1513519247388-193ad513d710?q=80&w=1200&auto=format&fit=crop",
        lighting: "https://images.unsplash.com/photo-1540932239986-30128078f3c5?q=80&w=1200&auto=format&fit=crop",
        diy: "https://images.unsplash.com/photo-1517646331032-9e8a17cb5a6a?q=80&w=1200&auto=format&fit=crop"
    };

    const match = Object.keys(gallery).find(k => title.includes(k));
    if (match) return gallery[match];

    const fallbacks = [
        "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200",
        "https://images.unsplash.com/photo-1634712282287-14ed57b9cc89?q=80&w=1200",
        "https://images.unsplash.com/photo-1556912177-f547cff96784?q=80&w=1200",
        "https://images.unsplash.com/photo-1616137422495-1e9e46e2aa77?q=80&w=1200",
        "https://images.unsplash.com/photo-1581578731522-632daa1328c3?q=80&w=1200",
        "https://images.unsplash.com/photo-1617103996702-96ff29b1c467?q=80&w=1200",
        "https://images.unsplash.com/photo-1616486701797-0f33f61038ec?q=80&w=1200",
        "https://images.unsplash.com/photo-1615873966164-325bdfa4d467?q=80&w=1200",
        "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?q=80&w=1200",
        "https://images.unsplash.com/photo-1534349762230-e0cadf78f5db?q=80&w=1200",
        "https://images.unsplash.com/photo-1540932239986-30128078f3c5?q=80&w=1200",
        "https://images.unsplash.com/photo-1513519247388-193ad513d710?q=80&w=1200",
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200",
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1200",
        "https://images.unsplash.com/photo-1616486341353-c583320f7881?q=80&w=1200"
    ];
    return fallbacks[index % fallbacks.length];
};
