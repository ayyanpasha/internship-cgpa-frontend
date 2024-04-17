import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import SubjectGradeLine from '../component/SubjectGradeLine';
import { useSelector } from "react-redux";

function Semester() {
    const history = useNavigate();
    const [numberOfSubjects, setNumberOfSubjects] = useState(8);
    const [POINTS, setPOINTS] = useState(0);
    const [CREDITS, setCREDITS] = useState(0);
    const { semester } = useParams();
    const regex = /^\d+$/;
    const [grades, setGrades] = useState(Array(numberOfSubjects).fill({ gradePoint: 0, creditHours: 0 }));
    const [sgpa, setSGPA] = useState(null);
    const { currentUser } = useSelector((state) => state.authentication);

    const saveSGPA = async () => {
        try {
            await fetch(`${process.env.REACT_APP_API}/api/semester/sgpa`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('Authorization')}`,
                },
                body: JSON.stringify({ semester: parseInt(semester), points: POINTS, credits: CREDITS }),
            });
            history('/');

        } catch (error) {
            console.error('Fetch error:', error.message);
        }
    };


    const calculateSGPA = () => {
        let totalPoints = 0;
        let totalCredits = 0;
        for (let i = 0; i < numberOfSubjects; i++) {
            totalPoints += parseInt(document.getElementById(`grade${i}`).value) * parseInt(document.getElementById(`credit${i}`).value);
            totalCredits += parseInt(document.getElementById(`credit${i}`).value);
            console.log(totalPoints);
            console.log(totalCredits);
        }
        const currentSGPA = totalPoints / totalCredits;
        setPOINTS(totalPoints);
        setCREDITS(totalCredits);
        setSGPA(parseFloat(currentSGPA).toFixed(2));
    }

    // Function to handle changing the number of subjects
    const handleNumberOfSubjectsChange = (e) => {
        let current = parseInt(e.target.value);
        let setNew = current % 10;
        if (regex.test(current)) {
            setNumberOfSubjects(setNew);
            setGrades(Array(setNew).fill({ gradePoint: 0, creditHours: 0 }));
            calculateSGPA();
        }
    };
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
                <h1>SGPA Semester {semester}</h1>
                <label>Number of Subjects(Upto 20 subjects):</label>
                <input
                    type="number"
                    min="1"
                    value={numberOfSubjects}
                    onChange={handleNumberOfSubjectsChange}
                />
                {grades.map((subject, index) => (
                    <SubjectGradeLine key={index} number={index} callback={calculateSGPA} />
                ))}
                Total Points - {POINTS}<br />
                Total Credits - {CREDITS}<br />
                <button className='btn btn-primary' onClick={saveSGPA}>Save</button>
                {sgpa && <p>SGPA: {sgpa}</p>}
            </div>
        );
}

export default Semester;
