import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Post {
    categories: Array<string>;
    title: string;
    body: string;
    slug: string;
    datePublished: bigint;
    author: string;
}
export interface backendInterface {
    getAllPosts(): Promise<Array<Post>>;
    getPost(slug: string): Promise<Post | null>;
    getPostCount(): Promise<bigint>;
    getPostsByCategory(category: string): Promise<Array<Post>>;
    newPost(slug: string, author: string, datePublished: bigint, title: string, body: string, categories: Array<string>): Promise<void>;
}
