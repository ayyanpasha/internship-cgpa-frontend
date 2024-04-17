import React, { useEffect, useState } from 'react'

export default function SubjectGradeLine({ number, callback }) {
    const [Credit, setCredit] = useState(4);
    const [Grade, setGrade] = useState(10);
    const regex = /^\d+$/;

    // Function to handle changing the number of subjects
    const handleGradeChange = (value) => {
        let current = parseInt(value);
        if (regex.test(current)) {
            if (current === 10) setGrade(10);
            else setGrade(current % 10);
        }
    };
    const handleCreditChange = (value) => {
        let current = parseInt(value) % 10;
        setCredit(current);
    };
    useEffect(() => {
        callback();
    }, [Credit, Grade]);
    return (
        <div>
            <label>{number + 1}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Grade Point:</label>&nbsp;&nbsp;
            <input
                id={`grade${number}`}
                type="number"
                value={Grade}
                onChange={e => handleGradeChange(e.target.value)}
            />&nbsp;&nbsp;&nbsp;&nbsp;
            <label>Credit Hours:</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input
                id={`credit${number}`}
                type="number"
                value={Credit}
                onChange={e => handleCreditChange(e.target.value)}
            />
        </div>
    )
}
