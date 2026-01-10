// place files you want to import through the `$lib` alias in this folder.

export type TrackInfo =
    | {
        songName: string;
        artistName: string;
        albumName: string;
        cover: string;
        link?: string;
    }
    | false
    | null;
export type Post = {
    title: string
    slug: string
    description: string
    date: string
    categories: string[]
    published: boolean
}
