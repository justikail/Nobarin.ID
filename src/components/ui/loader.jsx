import Image from "next/image";

export function Loader() {
  return (
    <div className="flex h-[80vh] items-center justify-center bg-black">
      <div className="relative h-30 w-30">
        <div className="absolute inset-0 h-full w-full">
          <Image src={"/asset/gif/chibi-popcorn-eating-unscreen.gif"} priority alt="Loading..." width={120} height={120} className="h-full w-full mx-auto" unoptimized />
        </div>
        <div className="absolute inset-0 rounded-full border-2 border-violet-600 opacity-75 animate-ping"></div>
      </div>
    </div>
  );
}
