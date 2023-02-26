import React from "react";
import Image from "next/image";
import { myLoader } from "@/lib/ImageLoader";

export default function UndownloadableImage(props) {
    const {
        src = '',
        alt = '',
        width = 1024,
        height = 1024,
        borderRadius = 0
    } = props;
    return (
        <Image
            src={src}
            alt={alt}
            //showSkeleton
            
            width={width}
            height={height}
            style={{
                //cursor:'pointer',
                objectFit:'cover',
                borderRadius: borderRadius,
                width:'auto',
                height:'auto',
                maxWidth:'100%',
                maxHeight:'100%'
            }}
            loader={myLoader}
            priority
            quality={100}
            //objectFit="cover"
            onContextMenu={(e) => e.preventDefault()}
        />
    )
}