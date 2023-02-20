import { useRouter } from "next/router"
import Head from 'next/head'
import { useEffect, useState } from "react"
import Lottie from "lottie-react";
import LoadingAnimation from '@/public/loading.json'
import Data from '@/data/google'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import axios from "axios";

export default function Search() {
    const r = useRouter()
    const CurrentYear = new Date().getFullYear() - 100


    const [year, setYear] = useState(Number(r.query.year))
    const [loading, setLoading] = useState(false)
    const [selectedDoodle, setSelectedDoodle] = useState([])
    const [dateEvents, setDateEvents] = useState([])
    const [text, setText] = useState("")
    const [Doodles, setDoodles] = useState([])
    const [searchYear, setSearchYear] = useState(Number(r.query.year))
    const [error, setError] = useState(false)
    

    const getGoogleSearch = async (info) => {
        setSelectedDoodle([info])
        const res = await axios.get(`https://byabbe.se/on-this-day/${info.month}/${info.day}/events.json`)
        const data = await res.data
        var SpecificDayYearEvent = []
        var SameDayMonth = []
        for(var x = 0; x < data.events.length; x++){
            if(Number(info.year) === Number(data.events[x].year)){
                SpecificDayYearEvent.push(data.events[x])
                // console.log(`month:${info.month} day:${info.day}`)
            } else if(Number(data.events[x].year) > CurrentYear){
                SameDayMonth.push(data.events[x])
                // console.log(`month:${info.month} day:${info.day}`)
            }
        }

        if (SpecificDayYearEvent.length !== 0){
            setText("These are events that occured the very same day when this Google Doodle was released")
            setDateEvents(SpecificDayYearEvent)
        } else if (SameDayMonth.length !== 0 && SpecificDayYearEvent.length === 0){
            setText("No significant events occured the same day, month, and year this Google Doodle was released. But here is a list of all the events that occured the same day and month")
            setDateEvents(SameDayMonth)
        } else {
            setText("Whoops, there's no events that share the same day and month")
            setDateEvents([])
        }
    }


    const getMonth = (month) => {
        const date = new Date();
        date.setMonth(month - 1);
        return date.toLocaleString('en-US', {month: 'long'});
    }

    
    const SearchYear = (e) => {
        if (e.key == "Enter"){
            setError(false)
            setDoodles([])
            setLoading(true)
            setSelectedDoodle([])
            setDateEvents([])
            setText("")
            console.log(searchYear)
        
            if(searchYear >= 1999 && searchYear <= 2023){
                setTimeout(() => {
                    setLoading(false) 
                    setYear(searchYear)
                    setDoodles(Data)
                }, 2000);
            } else {
                setTimeout(()=>{
                    setLoading(false) 
                    setError(true)
                }, 700)
            }
           
      }
    }
    

    useEffect(()=>{
        setError(false)
        setDoodles([])
        setLoading(true)
        setSelectedDoodle([])
        setDateEvents([])
        setText("")
        
        if(searchYear >= 1999 && searchYear <= 2023){
            setTimeout(() => {
                setLoading(false) 
                setYear(Number(r.query.year))
                setSearchYear(Number(r.query.year))
                setDoodles(Data)
            }, 6000);
        } else {
            setTimeout(()=>{
                setLoading(false) 
                setError(true)
            }, 700)
            
        }
    },[])

    return(
        <>
        <Head>
            <title>Google Doodles - Results</title>
            <meta name="description" content="Generated by create next app" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/google.svg" />
        </Head>
        <div className="flex flex-col justify-center items-center h-screen max-h-screen">
            <div className="flex fixed top-0 p-4 w-full justify-center items-center bg-white shadow-[0px_1px_5px_0px_rgba(85,85,85,0.4)]">
                <Image src="/google.svg" width={100} height={100} onClick={()=>r.replace("/")} className="cursor-pointer"></Image>
                <input placeholder="1999 - 2023" type="number" value={searchYear} onChange={(e)=>{setSearchYear(e.target.value)}} onKeyDown={SearchYear} className='flex rounded-3xl w-7/12 border-solid border border-gray-300 px-3 py-2 ml-5 items-center hover:shadow-[0px_1px_5px_0px_rgba(85,85,85,0.4)] focus-within:shadow-[0px_1px_5px_0px_rgba(85,85,85,0.4)]' pattern="[0-9]" maxLength={4} minLength={4} min="1999" max="2022"></input>
            </div>
            {loading && <Lottie className="flex absolute" style={{height:150, width:150}} animationData={LoadingAnimation} loop={true}/>}
            {error && <h1 className="flex absolute">Input needs to be a number between 1999 - 2023</h1>}
            <div className="flex w-screen h-full max-w-[1100px] justify-start items-start overflow-hidden mt-20">
                <div className={selectedDoodle.length == 0 ? "flex flex-row w-12/12 max-h-full overflow-scroll flex-wrap justify-center items-start" : "flex flex-col w-4/12 h-full max-h-full overflow-scroll items-center"}>
                    {Doodles.map((o,i)=>(
                        <>
                        {Number(year) === Number(o.year) ? 
                            <div className={styles.card} key={i} id={i} onClick={()=>{getGoogleSearch(o)}}>
                                <Image alt={o.title} src={`https:${o.url}`} width={250} height={100} styles={{width:"250px", height:"100px"}}/>
                                <p className="pt-4">{o.title}</p>
                            </div> 
                            : <></>
                        }
                        </>
                    ))}
                </div>
                <div className={selectedDoodle.length == 0 ? "flex flex-col h-full justify-start w-0/12 overflow-scroll pt-20" : "flex flex-col h-full max-h-full justify-start w-8/12 overflow-scroll border-solid border-l-2 pl-8 pr-5 mt-5 pb-14"}>
                    {selectedDoodle.map((o,i) => (
                        <div key={i} className="flex flex-col items-center mb-10">
                            <h1 className="font-semibold text-4xl pt-5">{o.title}</h1>
                            <div className="text-gray-500 font-medium pt-4 pb-7">
                                <span>{getMonth(o.month)} </span>
                                <span>{o.day}, </span>
                                <span>{o.year}</span>
                            </div>
                            <Image  alt={o.title} src={`https:${o.url}`} width={380} height={100} />
                        </div>
                    ))}
                    
                    <h1 className="text-gray-500 text-lg mb-5"><i>{text}</i></h1>

                    {dateEvents && dateEvents.map((o, index)=>{
                        return (
                            <div key={index} className="mb-3">
                                <b>{o.year}</b> - 
                                {o.description}
                            </div>
                        )
                    })}
                </div>  
            </div>
        </div>
     </>
    )
}