export const metadata = {
  title: "Nobarin.ID - Popular Movies List",
  link: [
    {
      rel: "preload",
      href: "/asset/gif/chibi-popcorn-eating-unscreen.gif",
      as: "image",
      type: "image/gif",
    },
  ],
};

export default function PopularLayout({ children }) {
  return <>{children}</>;
}
