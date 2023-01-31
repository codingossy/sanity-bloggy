// to connect the sanity and next js
import sanityClient from '@sanity/client'
import ImageUrlBuilder from '@sanity/image-url'
import { useNextSanityImage } from 'next-sanity-image'
import Image from 'next/image'



export const client = sanityClient({
    projectId: 'zk3zsqqi',
    dataset: 'production',
    // current data
    apiVersion: '2022-01-29',
    useCdn: true,
    token:  'skCYBlexG4zmnydPkuMzZmoik19rpdmpI241ARqZFXgPmU9J20v8T02siPFrWiEHcesrajC5jHl2jagMOTchswbXwLb7jT1haqOoN1bTF2NjHr2iNYOaDcm4OR9Uv4I7XOl1oE44xa9rNIGJRvEZ96XL8iUL3tMIFYJuOfYlHt71MJDEDsv6'
})

const builder = ImageUrlBuilder(client)

export const SanityImage = ({asset} ) => {
    const imageProps = useNextSanityImage(client, asset)

    if(!imageProps) return null

    return(
        <Image 
            {...imageProps}
            // layout='responsive'
            width='500'
            height='500'
            className='object-cover h-full leading-8'
        />
    )
}


export const urlFor = (source) => builder.image(source)