import Image from 'next/image'

export default function SelectedCard({
    alt="",
    key="",
    title="",
    month="",
    day="",
    year="",
    src="",
    text=""
}){

    return(
        <>
            <div key={key} className="flex flex-col items-center mb-10">
                <h1 className="font-semibold text-4xl pt-5">{title}</h1>
                <div className="text-gray-500 font-medium pt-4 pb-7">
                    <span>{month} </span>
                    <span>{day}, </span>
                    <span>{year}</span>
                </div>
                <Image  alt={alt} src={`https:${src}`} width={380} height={100} />
            </div>
        </>
    )
}