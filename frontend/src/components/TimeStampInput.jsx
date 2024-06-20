import PropTypes from 'prop-types';

const TimestampInput = ({ timestamp, setTimestamp }) => {
    return (
        <input
            className='w-full mb-4 px-3 py-2 border border-gray-300 rounded'
            type="text"
            placeholder="Timestamp (e.g., 00:01:30)"
            value={timestamp}
            onChange={(e) => setTimestamp(e.target.value)}
        />
    );
};

TimestampInput.propTypes = {
    timestamp: PropTypes.string.isRequired,
    setTimestamp: PropTypes.func.isRequired,
};

export default TimestampInput;