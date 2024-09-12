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
  const activeConcert = useSelector((store) => store.concerts.activeConcert[0]);
  const [showPDFModal, setShowPDFModal] = useState(false);
  const [showTrackModal, setShowTrackModal] = useState(false); // For the audio modal
  const [pdfs, setPdfs] = useState([{ file: null, name: "" }]);
  const [tracks, setTracks] = useState([
    { file: null, name: "", sectionId: 1, partId: 1, songId: null },
  ]);
  let { concertId } = useParams();
  const userProfile = useSelector((store) => store.userProfile);
  const sectionId = userProfile.section_id;

  useEffect(() => {
    dispatch({ type: "FETCH_ACTIVE_CONCERT", payload: concertId });
    dispatch({ type: "FETCH_PDFS", payload: concertId });
    dispatch({ type: "FETCH_SONGS", payload: concertId });
    dispatch({ type: "FETCH_TRACKS", payload: { concertId, sectionId } });
  }, [dispatch, concertId, sectionId]);

  const concertPdfs = useSelector((store) => store.concerts.concertPdfs);
  const sectionTracks = useSelector((store) => store.concerts.sectionTracks);
  const balancedTracks = useSelector((store) => store.concerts.balancedTracks);

  // PDF handlers
  const handleFileChange = (index, file) => {
    const newPdfs = [...pdfs];
    newPdfs[index].file = file;
    setPdfs(newPdfs);
  };

  const handleNameChange = (index, name) => {
    console.log("Name input:", name);
    const newPdfs = [...pdfs];
    newPdfs[index].name = name;
    setPdfs(newPdfs);
  };

  const handleAddPdf = () => {
    setPdfs([...pdfs, { file: null, name: "" }]);
  };

  const handleRemovePdf = (index) => {
    const newPdfs = [...pdfs];
    newPdfs.splice(index, 1);
    setPdfs(newPdfs);
  };

  const handleSubmitPdfs = () => {
    const formData = new FormData();
    pdfs.forEach((pdf) => {
      formData.append("files", pdf.file);
      formData.append("names[]", pdf.name);
    });
    formData.append("concertId", concertId);
    dispatch({ type: "UPLOAD_PDFS", payload: formData });
    setShowPDFModal(false);
  };

  // Track handlers
  const handleTrackFileChange = (index, file) => {
    const newTracks = [...tracks];
    newTracks[index].file = file;
    setTracks(newTracks);
  };

  const handleTrackNameChange = (index, name) => {
    const newTracks = [...tracks];
    newTracks[index].name = name;
    setTracks(newTracks);
  };

  const handleSectionChange = (index, sectionId) => {
    const newTracks = [...tracks];
    newTracks[index].sectionId =
      sectionId === 0 ? null : parseInt(sectionId, 10);
    setTracks(newTracks);
  };

  const handlePartChange = (index, partId) => {
    const newTracks = [...tracks];
    newTracks[index].partId = partId ? parseInt(partId, 10) : null;
    setTracks(newTracks);
  };

  const handleSongChange = (index, songId) => {
    const newTracks = [...tracks];
    newTracks[index].songId = songId === 0 ? null : parseInt(songId, 10);
    console.log("Updated songId:", newTracks[index].songId);
    setTracks(newTracks);
  };

  const handleAddTrack = () => {
    setTracks([
      ...tracks,
      { file: null, name: "", sectionId: 1, partId: 1, songId: null },
    ]);
  };

  const handleRemoveTrack = (index) => {
    const newTracks = [...tracks];
    newTracks.splice(index, 1);
    setTracks(newTracks);
  };

  const handleSubmitTracks = () => {
    const formData = new FormData();

    tracks.forEach((track) => {
      formData.append("files", track.file);
      formData.append("names[]", track.name);
      const sectionId = track.sectionId ? parseInt(track.sectionId, 10) : null;
      formData.append("sectionIds", sectionId || "");
      const partId = track.partId ? parseInt(track.partId, 10) : null;
      formData.append("partIds", partId || "");
      const songId = track.songId ? parseInt(track.songId, 10) : null;
      formData.append("songIds", songId || "");
    });

    formData.append("concertId", concertId);
    dispatch({ type: "UPLOAD_TRACKS", payload: formData });
    setShowTrackModal(false);
  };

  return (
    <div className="flex flex-col w-full items-center">
      {/* Concert Information */}
      {activeConcert && (
        <h2 className="py-4 text-3xl font-bold">
          Concert: {activeConcert.year} {activeConcert.period} -{" "}
          {activeConcert.name}
        </h2>
      )}
      <div className="w-8/12 bg-white rounded-lg shadow-lg p-4">
        {/* PDFs Section */}
        <div>
          <table className="w-full">
            <thead className="bg-teal-700">
              <tr className="flex flex-row items-center py-2 px-4">
                <th className="text-start w-full text-white">PDFs</th>
                <th className="flex flex-row w-full justify-end text-white">
                  <button className="flex flex-row mx-4">
                    <ArrowDownTrayIcon className="size-6" />
                    Download All PDFs
                  </button>
                  {user.isAdmin && (
                    <button
                      className="flex flex-row ml-4"
                      onClick={() => setShowPDFModal(true)}
                    >
                      <DocumentPlusIcon className="size-6" />
                      Add PDFs
                    </button>
                  )}
                </th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(concertPdfs) && concertPdfs.length > 0 ? (
                concertPdfs.map((pdf) => (
                  <tr
                    key={pdf.song_id}
                    className="flex flex-row items-center py-2 px-4"
                  >
                    <td className="text-start w-full">{pdf.name}</td>
                    <td>
                      <button className="flex flex-row items-center text-nowrap px-4 py-2 bg-teal-700 rounded-full text-white">
                        <ArrowDownTrayIcon className="size-6 mx-2" /> Download
                        PDF
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="text-center py-4">
                    No PDFs available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Rehearsal Tracks Section */}
        <div>
        <table className="w-full">
        <thead className="bg-teal-700">
          <tr className="flex flex-row items-center py-2 px-4">
            <th className="text-start w-full text-white">
              Rehearsal Tracks
            </th>
            <th className="flex flex-row w-full justify-end text-white">
              <button className="flex flex-row mx-4 text-nowrap">
                <ArrowDownTrayIcon className="size-6" />
                Download All Tracks
              </button>
              {user.isAdmin && (
                <button
                  className="flex flex-row ml-4 text-nowrap"
                  onClick={() => setShowTrackModal(true)}
                >
                  <DocumentPlusIcon className="size-6" />
                  Add Rehearsal Track
                </button>
              )}
            </th>
          </tr>
        </thead>
        <tbody>
          {balancedTracks.length > 0 && (
            <tr>
              <td colSpan="2">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="flex flex-row items-center px-4 py-2 border-b border-teal-700">
                      <th className="text-start w-full text-teal-700">Balanced Tracks</th>
                      <th className="text-end text-white">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {balancedTracks.map((track) => (
                      <tr
                        key={track.id}
                        className="flex flex-row items-center py-2 px-4"
                      >
                        <td className="text-start w-full">{track.track_name}</td>
                        <td className="text-end">
                          <button className="flex flex-row items-center text-nowrap px-4 py-2 bg-teal-700 rounded-full text-white">
                            <ArrowDownTrayIcon className="size-6 mx-2" /> Download
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </td>
            </tr>
          )}

          {sectionTracks.length > 0 && (
            <tr>
              <td colSpan="2">
                <table className="w-full mt-2">
                  <thead >
                    <tr className="flex flex-row items-center px-4 border-b border-teal-700">
                      <th className="text-start w-full text-teal-700">{userProfile.voice_section} Tracks</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {sectionTracks.map((track) => (
                      <tr
                        key={track.id}
                        className="flex flex-row items-center py-2 px-4"
                      >
                        <td className="text-start w-full">{track.track_name}</td>
                        <td className="text-end">
                          <button className="flex flex-row items-center text-nowrap px-4 py-2 bg-teal-700 rounded-full text-white">
                            <ArrowDownTrayIcon className="size-6 mx-2" /> Download
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </td>
            </tr>
          )}

          {balancedTracks.length === 0 && sectionTracks.length === 0 && (
            <tr>
              <td colSpan="2" className="text-center py-4">
                No Tracks available
              </td>
            </tr>
          )}
        </tbody>
      </table>
        </div>
      </div>

      {/* PDF Modal */}
      {showPDFModal && (
        <>
          <div className="fixed inset-0 bg-black opacity-60 z-40"></div>
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-[700px]">
              <div className="flex flex-row justify-between">
                <h2 className="text-3xl font-bold">Upload PDFs</h2>
                <XMarkIcon
                  className="size-8"
                  onClick={() => setShowPDFModal(false)}
                />
              </div>
              {pdfs.map((pdf, index) => (
                <div key={index} className="p-4 flex flex-row items-center">
                  <input
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
                <button
                  className="px-4 mx-4 py-1 border rounded-full bg-teal-700 text-white"
                  onClick={handleSubmitPdfs}
                >
                  Upload PDFs
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Track Modal */}
      {showTrackModal && (
        <>
          <div className="fixed inset-0 bg-black opacity-60 z-40"></div>
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-[700px]">
              <div className="flex flex-row justify-between">
                <h2 className="text-3xl font-bold">Upload Rehearsal Tracks</h2>
                <XMarkIcon
                  className="size-8"
                  onClick={() => setShowTrackModal(false)}
                />
              </div>
              {tracks.map((track, index) => (
                <div key={index} className="p-4 flex flex-col space-y-2">
                  <div className="flex flex-row">
                    <input
                      type="file"
                      accept="audio/*"
                      onChange={(e) =>
                        handleTrackFileChange(index, e.target.files[0])
                      }
                    />
                    <input
                      className="border px-4 mx-2 rounded-lg"
                      type="text"
                      placeholder="Track Name"
                      value={track.name}
                      onChange={(e) =>
                        handleTrackNameChange(index, e.target.value)
                      }
                    />
                    <XMarkIcon
                      className="px-2 py-1 rounded-lg size-10 text-red-700"
                      onClick={() => handleRemoveTrack(index)}
                    />
                  </div>
                  <div>
                    <select
                      className="border rounded-lg px-2 py-1 mr-4"
                      value={track.sectionId}
                      onChange={(e) =>
                        handleSectionChange(index, e.target.value)
                      }
                    >
                      <option value={0}>Section:</option>
                      <option value={1}>Tenor 1</option>
                      <option value={2}>Tenor 2</option>
                      <option value={3}>Baritone</option>
                      <option value={4}>Bass</option>
                      <option value={5}>Balanced Voices</option>
                    </select>
                    <select
                      className="border rounded-lg px-2 py-1 mx-4"
                      value={track.partId || ""}
                      onChange={(e) => handlePartChange(index, e.target.value)}
                    >
                      <option value="">Part:</option>
                      <option value={1}>Upper</option>
                      <option value={2}>Lower</option>
                    </select>
                    <select
                      className="border rounded-lg px-2 py-1 mx-4"
                      value={track.songId || ""}
                      onChange={(e) => {
                        const selectedValue = e.target.value;
                        console.log("Selected songId:", selectedValue);
                        handleSongChange(index, selectedValue);
                      }}
                    >
                      <option key={0} value={0}>
                        Select Song
                      </option>
                      {concertPdfs &&
                        concertPdfs.map((song) => (
                          <option key={song.song_id} value={song.song_id}>
                            {song.name}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              ))}
              <button onClick={handleAddTrack}>Add Another Track</button>
              <div className="flex flex-row justify-end">
                <button
                  className="px-4 mx-4 py-1 border rounded-full bg-teal-700 text-white"
                  onClick={handleSubmitTracks}
                >
                  Upload Tracks
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ConcertTracks;
