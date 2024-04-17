import React, { useEffect, useState } from 'react'
import SemesterCard from '../component/SemesterCard'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function SemesterSelect() {
    const semesters = [1, 2, 3, 4, 5, 6, 7, 8];
    const [SGPA, setSGPA] = useState([]);
    const [CGPA, setCGPA] = useState(0);
    const { currentUser } = useSelector((state) => state.authentication);
    const history = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API}/api/semester/cgpa`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('Authorization')}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setSGPA(data);
                let points = 0;
                let credits = 0;
                data.forEach((element) => {
                    points += parseInt(element.points);
                    credits += parseInt(element.credits);
                });
                const cgpa = points / credits;
                console.log(credits);
                if (credits !== 0) {
                    setCGPA(Number(cgpa.toFixed(2)));
                }
            } catch (error) {
                console.error('Fetch error:', error.message);
                // Handle error
            }
        };

        fetchData();
    }, []); // Empty dependency array to run only once

    useEffect(() => {
        if (currentUser !== undefined && currentUser === null) {
            history("/login");
        }
    }, [history, currentUser]);
    if (currentUser === undefined) {
        return (<></>);
    } else if (currentUser !== null)
        return (
            <div className='container'>
                <div className='row my-3'>
                    {semesters.map((element) => <SemesterCard key={element} number={element} SGPA={SGPA} />)}
                </div>
                CGPA - {CGPA}
            </div>
        )
}
