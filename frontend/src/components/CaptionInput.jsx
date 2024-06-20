import { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import TimestampInput from "../components/TimeStampInput";

const CaptionInput = ({ setUrl }) => {
    const [url, setUrlInput] = useState('');
    const [captions, setCaptions] = useState([]);
    const [text, setText] = useState('');
    const [timestamp, setTimestamp] = useState('');

    const handleAddCaption = () => {
        setCaptions([...captions, { text, timestamp }]);
        setText('');
        setTimestamp('');
    };

    const handleSubmit = () => {
        axios.post('http://localhost:8080/api/v1/captions', { url, captionData: captions })
            .then(response => {
                setUrl(url);
                console.log('Captions submitted:', response.data);
            })
            .catch(error => {
                console.error('Error submitting captions:', error);
            });
    };

    return (
        <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
            <input
                className="w-full mb-4 px-3 py-2 border border-gray-300 rounded"
                type="text"
                placeholder="Video URL"
                value={url}
                onChange={(e) => setUrlInput(e.target.value)}
            />
            <input
                className="w-full mb-4 px-3 py-2 border border-gray-300 rounded"
                type="text"
                placeholder="Caption Text"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <TimestampInput timestamp={timestamp} setTimestamp={setTimestamp} /><br></br>
            <div>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 mr-2"
                    onClick={handleAddCaption}
                >
                Add Caption
                </button>
                <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2"
                    onClick={handleSubmit}
                >
                Submit
                </button>
            </div>
            <div className="mt-4">
                {captions.map((caption, index) => (
                    <div key={index} className="mb-2">
                        <strong>{caption.timestamp}</strong>: {caption.text}
                    </div>
                ))}
            </div>
        </div>
    );
};

CaptionInput.propTypes = {
    setUrl: PropTypes.func.isRequired,
};

export default CaptionInput;