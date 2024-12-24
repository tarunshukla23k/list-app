import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';

const CandidateList = () => {
  const [candidates, setCandidates] = useState([]);
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    axios.get('http://localhost:5001/api/candidates')
      .then(response => setCandidates(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const filteredCandidates = candidates.filter(candidate =>
    candidate.name.toLowerCase().includes(search.toLowerCase()) ||
    candidate.skills.toLowerCase().includes(search.toLowerCase())
  );

  const sortedCandidates = [...filteredCandidates].sort((a, b) => {
    return sortOrder === 'asc' ? a.experience - b.experience : b.experience - a.experience;
  });

  return (
    <div className="candidate-list">
      <h1>Candidate List</h1>
      <div className='search'>
      <input
        type="text"
        placeholder="Search by name or skills"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
        Sort by Experience ({sortOrder})
      </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Skills</th>
            <th>Years of Experience</th>
          </tr>
        </thead>
        <tbody>
          {sortedCandidates.map((candidate, index) => (
            <tr key={index}>
              <td>{candidate.name}</td>
              <td>{candidate.skills}</td>
              <td>{candidate.experience}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CandidateList;