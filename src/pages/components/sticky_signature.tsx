import Image from "next/image";

export default function Signature() {
  const imageUrl = "/images/signature.png";
  return (
    <aside className="hidden lg:inline-flex fixed z-40 m-6 bottom-0 left-0">
      <div>
        <button className="cursor-pointer ">
          <a href="https://github.com/joestakey" aria-label="Github" target="_blank" rel="noreferrer noopener">
            <Image
              className="h-8 w-auto"
              src={`${imageUrl}`}
              alt=""
              width={100}
              height={100}
            />
          </a>
        </button>
        <div className="font-custom-bold text-[#031672] text-2xl sm:text-3xl">
          Sherlock Explorer
        </div>
      </div>
    </aside>
  )
}
