import React from "react"
import './entrieslog.css'
import optionIcon from '../assets/dot.png'

const Entrieslog = ({entries})=>{
    return(

    <div className="daylog">
        
        <table>
            <thead>
                <tr>
                    <th>SHIFT DATE</th>
                    <th>FIRST CHECK IN</th>
                    <th>LAST CHECK OUT</th>
                    <th>TOTAL WORK HOURS</th>
                    <th>DETAILS</th>
                </tr>
            </thead>
        <tbody>
            {entries.map((entry,index)=>(
                <tr key={index} className="days">
                    <td>{entry.Date}</td>
                    <td>{entry.Date}  {entry.Checkin}</td>
                    <td>{entry.Date} {entry.Checkout}</td>
                    <td>{entry.Workhours}</td>
                    <td><img src={optionIcon} alt="optionicon"/></td>
                </tr>
                   
            ))}
        </tbody>
        </table>
    </div>
    )
}
export default Entrieslog