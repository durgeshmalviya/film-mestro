// components/seo/MetaPreview.tsx
"use client";

type Props = {
  title: string;
  description: string;
  url?: string;
};

export default function MetaPreview({ title, description, url = "maestrofilms.co.in" }: Props) {
  return (
    <div className="border rounded-xl p-4 bg-white shadow-sm max-w-xl">
      <p className="text-sm text-green-700 mb-1">{url}</p>
      <h3 className="text-xl text-blue-800 font-medium leading-snug mb-1 line-clamp-2">
        {title}
      </h3>
      <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
    </div>
  );
}