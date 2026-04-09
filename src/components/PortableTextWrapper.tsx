import { PortableText, PortableTextComponents } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/client";
import { FileIcon } from "lucide-react";
import LightboxImage from "./LightboxImage";

const builder = imageUrlBuilder(client);
function urlFor(source: any) {
  return builder.image(source);
}

function getFileUrl(source: any) {
  if (!source?.asset?._ref) return null;
  const ref = source.asset._ref;
  const [_file, id, extension] = ref.split('-');
  return `https://cdn.sanity.io/files/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "t90obuqv"}/${process.env.NEXT_PUBLIC_SANITY_DATASET || "production"}/${id}.${extension}`;
}

const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) return null;
      return (
        <div className="my-8 relative w-full h-[50vh] overflow-hidden rounded-2xl group">
          <LightboxImage 
            src={urlFor(value).url()} 
            alt={value.alt || "Post image"} 
            fill={true}
            className="w-full h-full"
          />
        </div>
      );
    },
    file: ({ value }) => {
      const fileUrl = getFileUrl(value);
      if (!fileUrl) return null;
      return (
        <a href={fileUrl} target="_blank" rel="noreferrer" className="flex items-center gap-3 my-6 p-6 border border-foreground/10 rounded-2xl hover:bg-foreground/5 transition-colors no-underline">
          <FileIcon size={24} className="text-primary" />
          <div className="flex flex-col">
            <span className="font-bold text-base m-0 leading-tight">Attachment</span>
            <span className="text-sm opacity-60 m-0 leading-tight block mt-1">{value.description || "Download attached file"}</span>
          </div>
        </a>
      );
    }
  }
};

interface PortableTextWrapperProps {
  value: any;
}

export default function PortableTextWrapper({ value }: PortableTextWrapperProps) {
  return <PortableText value={value} components={portableTextComponents} />;
}
