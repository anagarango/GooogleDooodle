import styles from '@/styles/Home.module.css'
import Image from 'next/image'

export default function Card({
    alt="",
    key="",
    id="",
    onClick=()=>{},
    src="",
    text=""
}){

    return(
        <>
            <div className={styles.card} key={key} id={id} onClick={onClick}>
                <Image unoptimized alt={alt} src={`https:${src}`} width={250} height={100} styles={{width:"250px", height:"100px"}}/>
                <p className="pt-4">{text}</p>
            </div> 
        </>
    )
}