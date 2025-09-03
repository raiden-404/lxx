import { formatDistanceToNow } from 'date-fns';
import { useEffect, useState } from 'react';

const TimeAgo = ({isoDateString, size}) => {

    const calculateTimeAgo = () => {
        if(isoDateString) {
            const date = new Date(isoDateString);
            return formatDistanceToNow(date, {addSuffix: true});
        }
        return '';
    };

    //Set the initial time when the component load
    const [timeAgo, setTimeAgo] = useState(calculateTimeAgo());

    useEffect(() => {
        //set interval to recalculate time
        const interval = setInterval(() => {
        setTimeAgo(calculateTimeAgo());
    }, 30000);

    //Cleanup function to prevent memory leak
    return () => {
        clearInterval(interval);
    };
},[isoDateString]);

  return (
    <span className={`text-gray-400/70 text-${size ? "[11]" : "sm" }`}>{size ? timeAgo.replace("about", "") : timeAgo}</span>
  )
}

export default TimeAgo;