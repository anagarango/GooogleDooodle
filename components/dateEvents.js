export default function DateEvents({
    key="",
    year="",
    description=""
}){

    return(
        <>
            <div key={key} className="mb-3">
                <span><b>{year}</b> - {description}</span>
            </div>
        </>
    )
}