// import React, { useState } from 'react';
import { useState } from 'react';
import CaptionInput from './components/CaptionInput';
import VideoPlayer from './components/VideoPlayer';

const App = () => {
    const [url, setUrl] = useState('');

    return (
        <div className='container mx-auto'>
            <h1 className='text-3xl font-bold text-center my-8'>Welcome to Video caption App</h1>
            <CaptionInput setUrl={setUrl} />
            {url && <VideoPlayer url={url} />}
        </div>
    );
};

export default App;