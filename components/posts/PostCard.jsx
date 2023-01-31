import Image from "next/image";
import Link from "next/link";
import React from "react";
import { urlFor } from "../../link/client";
import Tag from "../tag/Tag";

const PostCard = ({ posts }) => {
  const { title, publishedAt, image, name, authorImage, categories } = posts;
  // use this when loading from a server
  const src = urlFor(posts.image).url();

  return (
    <Link
      href="/posts/[slug]"
      as={`/posts/${posts.slug.current}`}
      className="border p-2 h-full w-full"
    >
      <Image
        src={urlFor(image).url()}
        alt="post"
        width="500"
        height="500"
        className="w-full h-44 object-cover transition-all ease-in duration-300 hover:scale-95 cursor-pointer"
        loader={() => src}
      />

      <div className="py-2 text-center border-b">
        <h2 className="text-center text-lg font-semibold capitalize">
          {title}
        </h2>
        <p className="text-xs text-gray-300">
          Published on: {new Date(publishedAt).toDateString()}
        </p>
      </div>

      <div className="py-2 flex justify-between">
        <p className="capitalize text-xs">posted by: {name}</p>
        <p>
          <Image
            src={urlFor(authorImage).url()}
            width={200}
            height={200}
            className="w-8 h-8 object-cover rounded-full"
            alt="author image"
          />
        </p>
      </div>
      <div className="my-1">
        <p className="text-center">categories:</p>
        <div className="flex flex-col gap-y-4 items-center justify-center gap-x-5 p-2">
          {categories?.map((category) => (
            <>{category && <Tag key={category} title={category?.title} />}</>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default PostCard;





