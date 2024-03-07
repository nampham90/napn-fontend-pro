export interface Product {
    id: string;
    lang: string;
    product_name: string;
    description: string;
    price: number;
    stock: number;
    is_composite: boolean;
    image: string;
    createdAt: Date;
    updatedAt: Date;
    category_id: number;
    productCategoryId: number;
    product_category: Category;
    isaddproduct?: boolean;
}

interface Category {
    name: string;
}