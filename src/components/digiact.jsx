import { useRef, useState } from 'react';
import './digi.css'
import Entrieslog from './entrieslog'; 
import calendarIcon from '../assets/calendar.png'; 
import hclIcon from '../assets/hcl-logo.png'
import Swal from 'sweetalert2'


export default function App(){

    const[enteredSummary,setenteredSummary] = useState('')
    const[checkIn,setcheckIn] = useState('');
    const[checkOut,setcheckOut] = useState('');
    const[workHours,setworkHours] = useState("00:00")
    const [timeEntries,settimeEntries] =useState([])
    const summary = useRef();
    const x = checkOut-checkIn
    console.log(x)


    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-IN',{
        year : "2-digit",
        month:'short',
        day : "numeric"
    });

    //function to parse time
    const splitTime = (timeString)=>{
        const[time,period] = timeString.split(' ')
        const[hours,minutes] = time.split(':').map(Number)
        return hours*60 +minutes
    }

    //function to calculate difference
    const diffCalculator = (checkIN,checkOut)=>{

        const time1 = splitTime(checkIN)
        const time2 = splitTime(checkOut)
        console.log(`checkin in minutes:${time1}`)
        console.log(`checkout in minutes:${time2}`)
        let diff = time2-time1
        const hours = Math.floor(diff/60);
        const minutes = diff%60

        return(`${hours}:${minutes}`)

    }
    
    
    //function to get Summary
    const addEntries=()=>{
        if (checkOut===''){
            showAlert()
            return
        }
        const currentSummary = summary.current.value
        const newlog  = {
            Date : formattedDate,
            Checkin : checkIn,
            Checkout : checkOut,
            Workhours: workHours,
            Summary :currentSummary,
        }
       
        settimeEntries((prev)=>[...prev,newlog])
        setcheckIn('')
        setcheckOut('')
        setworkHours('')
        
        summary.current.value = ''
    
    }
    //function to get current time
    const getCurrentTime = ()=>{
        const currentTime = new Date().toLocaleTimeString([],{
            hour : '2-digit',
            minute : '2-digit',
        })
        return currentTime;
    }
    //funttion to checkin/out
    const handleCheckIn=()=>{
        setcheckIn(getCurrentTime());
        console.log(checkIn)
    }
    const handleCheckout=()=>{
        const checkOuttime = getCurrentTime()
        setcheckOut(checkOuttime);
        setworkHours(diffCalculator(checkIn,checkOuttime))
       
    }
    const showAlert = ()=>{
        Swal.fire({
            
            text: 'Check-out time is required.',
            icon : 'error',
            confirmButtonText: 'OK',
            customClass:{
                confirmButton:'okbutton'
            }
        })
    }

    return(
        <div className="PunchInpage">
            <div className="title">
                <h1>DIGITAL ACT</h1>
            </div>
            <div className="info">
                <h2>Do Your Daily Check-In / Check-Out</h2>
            </div>
            <div className="PunchIn">
                
                <div className="date">
                    <img src={calendarIcon} alt='calendericon'/>
                    <p className='date'>{formattedDate}</p>
                </div>
                <div className="entry">
                    <h3>{checkIn}</h3>
                    <button className='button' onClick={handleCheckIn}>CHECK IN</button>
                </div>
                <div className="entry">
                    <h3>{checkOut}</h3>
                    <button className='button' onClick={handleCheckout}>CHECK OUT</button>
                </div>
                
                <div className="workhours">
                    <p>{workHours}</p>
                    <p>WORK HOURS</p>
                </div>
                <div className="summary">
                    <input ref = {summary} type="text" placeholder="Enter work summary"/>
                    <p>SUMMARY</p>
                </div>
                <button className='button' onClick={addEntries}>SUBMIT</button>  
            </div>
            <div className='missed'>
                    <p>I missed doing timely Check-In & Check-Out for this date and I will ensure to do this activity regularly going forward.
                    </p>
            </div>
            <div className='pastsubmission'>
                <p>View Past Submissions
                </p>
            </div>
            
        
            <div className="timeEntries">
                <Entrieslog entries = {timeEntries}/>
            </div> 
            
            
        </div>
           

       
        
    )
}