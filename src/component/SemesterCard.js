import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function SemesterCard({ number, SGPA }) {
    const [sgpa, setSGPA] = useState(-1);
    useEffect(() => {
        let current = 0;
        SGPA.forEach((element) => {
            if (element.semester === number) {
                current = (element.points / element.credits);
            }
        });
        if (current != 0)
            setSGPA(parseFloat(current).toFixed(2));
    }, [SGPA]);
    return (
        <div className='col-lg-3 col-md-4 col-sm-12 my-2'>
            <div className="card" style={{ width: '100%' }}>
                <div className="card-body">
                    <h5 className="card-title">Semester {number}</h5>
                    SGPA - {(sgpa === -1) ? "Not Entered" : sgpa}<br />
                    <Link to={`/semester/${number}`} className="btn btn-primary">Select</Link>
                </div>
            </div>
        </div>
    )
}
