import groq from "groq";
import React from "react";
import Tag from "../../components/tag/Tag";
import { PortableText } from "@portabletext/react";
import { client, SanityImage, urlFor } from "../../link/client";
import Image from "next/image";



const PostComponents = {
  types: {
    image: ({ value }) => {
      return (
        <SanityImage 
        {...value}
          src={urlFor(value)}
          width="500"
          height="500"
          className=""
          alt={value.alt || " "}
        />
      );
    },
  },
};

const SinglePost = ({ postDetails }) => {
  console.log(postDetails);
  const { title, categories, body, authorImage, about, postedAt } =
    postDetails;

  return (
    <section>
      {postDetails && (
        <article>
          <h1 className="uppercase text-center md:text-start">{title}</h1>
          <hr />
          

          <div className="my-5 flex text-justify flex-col items-center justify-center">
            <PortableText value={body} components={PostComponents} />
          </div>

          <div className="my-3 capitalize flex gap-x-2 items-center"> 
              <p className="text-xs text-gray-600">published at: </p>
           <p className="text-xs text-gray-600"> {postDetails.publishedAt}</p>
          </div>

          <div className="my-5">
            <Image
              width="200"
              height="200"
              className="w-10 h-10 rounded-full object-cover"
              src={urlFor(authorImage).url()}
              alt={postDetails.name + " image"}
            />
            <h3 className="mt-3 capitalize flex items-center gap-x-2">
              Author:
              <span> {postDetails.name}</span>
            </h3>
            <span className="flex items-center gap-x-2">
            <p>About Author:</p>
            <p className="capitalize"> {postDetails.about[0].children[0].text}</p>
            </span>
          </div>

          <div className="flex gap-x-4 my-10">
            {categories?.map((category) => (
              <>
                <div className="flex gap-x-5 capitalize items-center">
                  <h1>tags:</h1>
                  {category && <Tag key={category.id} title={category.title} />}
                </div>
              </>
            ))}
          </div>

      
        </article>
      )}
    </section>
  );
};

// copied from docs and google
const query = groq`*[_type == "post" && slug.current == $slug][0]
{
    title,
        "name"
:
    author->name,
        "about"
:
    author->bio,
        "categories"
:
    categories[]
->
    {
        id, title
    }
,
    "authorImage"
:
    author->image,
        body,
        publishedAt,
        image,
        postedAt
}
`;

export const getStaticPaths = async () => {
  const paths = await client.fetch(
    groq`*[_type == "post" && defined(slug.current)][].slug.current`
  );

  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: true,
  };
};

export const getStaticProps = async ({ params }) => {
  const postDetails = await client.fetch(query, { slug: params.slug });

  return {
    props: {
      postDetails,
    },
  };
};

export default SinglePost;
