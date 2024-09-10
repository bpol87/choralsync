import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ArrowDownTrayIcon, DocumentPlusIcon } from "@heroicons/react/24/outline";
import UploadForm from "./UploadForm.jsx";

function ConcertTracks() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  let { concertId } = useParams();

  // State to manage modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch({ type: "FETCH_MEMBER", payload: user.id });
  }, [dispatch, user.id]);

  const memberSection = useSelector((store) => store.members.memberProfile.section_id);
  console.log(memberSection);

  // Open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col w-full items-center">
      <h2></h2>
      <div className="w-8/12 bg-white rounded-lg shadow-lg p-4">
        <table className="w-full">
          <thead className="bg-teal-700">
            <tr className="flex flex-row items-center py-2 px-4">
              <th className="text-start w-full">PDFs</th>
              <th className="flex flex-row w-full justify-end text-white">
                <button className="flex flex-row mx-4">
                  <ArrowDownTrayIcon className="size-6" />
                  Download All PDFs
                </button>
                {user.isAdmin && (
                  <button
                    className="flex flex-row ml-4"
                    onClick={openModal} // Open modal on button click
                  >
                    <DocumentPlusIcon className="size-6" />
                    Add PDFs
                  </button>
                )}
              </th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
        <table className="w-full">
          <thead className="bg-teal-700">
            <tr className="flex flex-row items-center py-2 px-4">
              <th className="text-start text-white w-full">Rehearsal Tracks</th>
              <th className="flex flex-row w-full justify-end text-white">
                {user.isAdmin && (
                  <button className="flex flex-row ml-4">
                    <DocumentPlusIcon className="size-6" />
                    Add Rehearsal Tracks
                  </button>
                )}
              </th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>

      {/* Modal for uploading PDFs */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
            <h2 className="text-lg font-bold mb-4">Upload PDFs</h2>
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={closeModal}
            >
              X
            </button>
            <UploadForm closeModal={closeModal} />
          </div>
        </div>
      )}
    </div>
  );
}

export default ConcertTracks;