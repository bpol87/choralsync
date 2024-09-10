import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadFilesRequest } from '../actions/uploadActions';

const UploadForm = ({ closeModal }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [additionalData, setAdditionalData] = useState({ description: '' });
  const dispatch = useDispatch();
  const { uploading, success, error } = useSelector(state => state.upload);

  const handleFileChange = (event) => {
    setSelectedFiles(event.target.files);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdditionalData({ ...additionalData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(uploadFilesRequest(selectedFiles, additionalData));
    closeModal();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" multiple accept="application/pdf" onChange={handleFileChange} />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={additionalData.description}
          onChange={handleInputChange}
          className="mt-4 p-2 border rounded"
        />
        <button type="submit" disabled={uploading} className="mt-4 bg-teal-700 text-white px-4 py-2 rounded">
          {uploading ? 'Uploading...' : 'Upload PDFs'}
        </button>
      </form>

      {success && <p className="text-green-500">Upload successful!</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
    </div>
  );
};

export default UploadForm;