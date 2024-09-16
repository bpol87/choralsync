import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { PlusCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";

function MusicLibrary() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newConcert, setNewConcert] = useState({
    name: "",
    period: "",
    year: "",
  });

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "FETCH_CONCERTS" });
  }, [dispatch]);

  const concerts = useSelector((store) => store.concerts.concertList) || [];
  console.log(concerts);
  const user = useSelector((store) => store.user);

  const handleClick = (concertId) => {
    history.push(`/music-library/${concertId}`);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewConcert({ ...newConcert, [name]: value });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    dispatch({ type: "ADD_CONCERT", payload: newConcert });
    setNewConcert({ name: "", period: "", year: "" });
    setIsModalOpen(false);
  };

  const removeConcert = (concertId) => {
    dispatch({ type: "REMOVE_CONCERT", payload: concertId });
  };

  return (
    <div className="flex flex-col items-center w-full">
      <h2 className="text-3xl font-bold py-2">Concerts</h2>
      <div className="flex flex-col bg-white rounded-lg shadow-lg p-4 w-8/12 min-w-96">
        {user.isAdmin && (
          <div className="self-end flex flex-col items-end space-y-2">
            <button
              id="addConcert"
              className="flex flex-row text-teal-700 justify-end items-center"
              onClick={() => setIsModalOpen(true)}
            >
              <PlusCircleIcon className="h-6 w-6 mr-2" /> Add New Concert
            </button>
          </div>
        )}
        <ul>
          {concerts.length > 0 ? (
            concerts.map((concert) => (
              <li key={concert.id} className="flex flex-row py-2">
                <div
                  className="underline underline-offset-1 text-teal-700"
                  onClick={() => handleClick(concert.id)}
                >
                  {concert.year} {concert.period} - {concert.name}
                </div>
                {user.isAdmin && (
                  <button
                    className="mx-4 px-4 rounded-lg bg-red-700 text-white shadow-md"
                    onClick={() => removeConcert(concert.id)}
                  >
                    Delete
                  </button>
                )}
              </li>
            ))
          ) : (
            <li className="py-2">No concerts available</li>
          )}
        </ul>
      </div>

      {/* Modal and Overlay */}
      {isModalOpen && (
        <>
          <div className="fixed inset-0 bg-black opacity-60 z-40"></div>
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Add New Concert</h3>
                <button onClick={() => setIsModalOpen(false)}>
                  <XCircleIcon className="h-6 w-6" />
                </button>
              </div>
              <form onSubmit={handleFormSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700">Concert Name</label>
                  <input
                    type="text"
                    name="name"
                    value={newConcert.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Period</label>
                  <select
                    name="period"
                    value={newConcert.period}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    required
                  >
                    <option value="">Select a Period:</option>
                    <option value="Holiday">Holiday</option>
                    <option value="Pride">Pride</option>
                    <option value="Spring">Spring</option>
                    <option value="Ongoing">Ongoing</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Year</label>
                  <input
                    type="number"
                    name="year"
                    placeholder="YYYY"
                    value={newConcert.year}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-teal-500 text-white px-4 py-2 rounded-lg"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default MusicLibrary;
