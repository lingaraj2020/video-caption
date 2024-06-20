import { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import axios from "axios";
import PropTypes from "prop-types";

const VideoPlayer = ({ url }) => {
    const [captions, setCaptions] = useState([]);
    const [currentCaption, setCurrentCaption] = useState('');

    useEffect(() => {
        axios
            .get("http://localhost:8080/api/v1/captions")
            .then((response) => {
                setCaptions(response.data.captions);
            })
            .catch((error) => {
                console.error("Error fetching captions:", error);
            });
    }, []);

    const handleProgress = (state) => {
        const currentTime = state.playedSeconds;
        const caption = captions.find((caption, index) => {
            const [hours, minutes, seconds] = caption.timestamp.split(':').map(Number);
            const captionTime = (hours * 3600) + (minutes * 60) + seconds;
            return currentTime >= captionTime && (index === captions.length - 1 || currentTime < parseTimestamp(captions[index + 1].timestamp));
        });
        if (caption) {
            setCurrentCaption(caption.text);
        }
    };

    const parseTimestamp = (timestamp) => {
        const [hours, minutes, seconds] = timestamp.split(':').map(Number);
        return (hours * 3600) + (minutes * 60) + seconds;
    };

    return (
        <div className="relative w-full max-w-3xl mx-auto">
            <ReactPlayer
                url={url}
                controls
                width="100%"
                height="500px"
                onProgress={handleProgress}
                playing  // Auto play the video
                muted    //muted video
            />
            <div className="absolute inset-x-0 bottom-0 flex justify-center pointer-events-none">
                <div className="bg-black bg-opacity-50 text-white text-xl p-2 rounded">
                    {currentCaption}
                </div>
            </div>
        </div>
    );
};

VideoPlayer.propTypes = {
    url: PropTypes.string.isRequired,
};

export default VideoPlayer;