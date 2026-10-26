import Image, { type ImageProps } from "next/image";

/** A photo from public/photos with a required alt, so nothing ships without one. */
export default function Photo({ src, alt, className = "", ...rest }: ImageProps & { alt: string }) {
  return <Image src={src} alt={alt} className={className} {...rest} />;
}
