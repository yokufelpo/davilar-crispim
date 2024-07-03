import { NavBarItemType } from "@/config";
import Link from "next/link";

export default function NavBarItem({
  title,
  href,
  icon: Icon,
}: NavBarItemType) {
  return (
    <Link className="flex flex-col items-center" href={href}>
      <Icon size={70} />
      <div className="font-bold">{title}</div>
    </Link>
  );
}
