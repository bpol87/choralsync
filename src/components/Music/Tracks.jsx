import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { 
  XMarkIcon,
  ArrowDownTrayIcon,
  DocumentPlusIcon,
} from "@heroicons/react/24/outline";

function ConcertTracks() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const activeConcert = useSelector(store => store.concerts.activeConcert[0])
  const [showModal, setShowModal] = useState(false);
  const [pdfs, setPdfs] = useState([{ file: null, name: "", category: "" }]);
  let { concertId } = useParams();

  useEffect(() => {
    dispatch({type: 'FETCH_ACTIVE_CONCERT', payload: concertId})
  }, [])
  const handleFileChange = (index, file) => {
    const newPdfs = [...pdfs];
    newPdfs[index].file = file;
    setPdfs(newPdfs);
  };

  const handleNameChange = (index, name) => {
    const newPdfs = [...pdfs];
    newPdfs[index].name = name;
    setPdfs(newPdfs);
  };

  const handleCategoryChange = (index, category) => {
    const newPdfs = [...pdfs];
    newPdfs[index].category = category;
    setPdfs(newPdfs);
  };

  const handleAddPdf = () => {
    setPdfs([...pdfs, { file: null, name: "", category: "" }]);
  };

  const handleRemovePdf = (index) => {
    const newPdfs = [...pdfs];
    newPdfs.splice(index, 1);
    setPdfs(newPdfs);
  };

  const handleSubmit = () => {
    const formData = new FormData();
    pdfs.forEach((pdf, index) => {
      formData.append("files", pdf.file);
      formData.append("names", pdf.name);
      formData.append("categories", pdf.category);
    });
    formData.append("concertId", concertId);
    dispatch({ type: "UPLOAD_PDFS", payload: formData });
    setShowModal(false);
  };

  return (
    <div className="flex flex-col w-full items-center">
      {activeConcert && <h2 className="py-4 text-3xl font-bold">Concert: {activeConcert.year} {activeConcert.period} - {activeConcert.name}</h2>}
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
                    onClick={() => setShowModal(true)}
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
      </div>

      {/* Modal for PDF upload */}
      {showModal && (
        <>
          <div className="fixed inset-0 bg-black opacity-60 z-40"></div>
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-[400]">
              <div className="flex flex-row justify-between">
              <h2 className="text-3xl font-bold">Upload PDFs</h2>
              <XMarkIcon className="size-8" onClick={() => setShowModal(false)} />
              </div>
              {pdfs.map((pdf, index) => (
                <div key={index} className="p-4 flex flex-row items-center">
                  <input
                    className=""
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => handleFileChange(index, e.target.files[0])}
                  />
                  <input
                    className="border px-4 mx-2"
                    type="text"
                    placeholder="Song Name"
                    value={pdf.name}
                    onChange={(e) => handleNameChange(index, e.target.value)}
                  />

                  <XMarkIcon
                    className="px-2 py-1 rounded-lg size-10 text-red-700"
                    onClick={() => handleRemovePdf(index)}
                  />
                </div>
              ))}
              <button onClick={handleAddPdf}>Add Another PDF</button>
              <div className="flex flex-row justify-end">
                <button className="px-4 mx-4 py-1 border rounded-full bg-teal-700 text-white" onClick={handleSubmit}>Upload PDFs</button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ConcertTracks;
