import Link from "next/link";
import { Home } from "lucide-react";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type Props = {
  items: BreadcrumbItem[];
};

export default function Breadcrumb({ items }: Props) {
  return (
    <div className="hidden md:block md:border-b md:border-[#E1E1E1] md:pb-3 md:mb-5">
      <div className="flex items-center gap-2 text-sm text-gray-400 pb-3">
        <Home size={16} className="text-[#C1C1C1]" />

        <div className="flex items-center gap-2 flex-wrap">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <div key={index} className="flex items-center gap-2">
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="hover:text-gray-600 transition"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-orange-500 font-medium">
                    {item.label}
                  </span>
                )}

                {!isLast && <span className="text-gray-300">|</span>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
