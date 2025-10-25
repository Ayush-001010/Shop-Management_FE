import React, { useEffect, useState } from "react";
import type IActivities from "./IActivities";
import ActivitiesHeader from "./ActivitiesHeader/ActivitiesHeader";
import ActivitesContent from "./ActivitesContent/ActivitesContent";
import ActivitesIcon from "./ActivitesIcon/ActivitesIcon";
import NoActivitiesText from "./NoActivitiesText/NoActivitiesText";

const Activities: React.FC<IActivities> = ({ activitiesOption, activityHandler, activityData }) => {
    const [noActivityOccure, setNoActivityOccure] = useState<boolean>(false);

    useEffect(() => {
        if (activityData.length === 0) return;
        if (activityData.filter(item => item.value !== 0).length === 0) {
            setNoActivityOccure(true);
        } else {
            setNoActivityOccure(false);
        }
    }, [activityData])
    return (
        <div className="w-full h-full">
            <ActivitiesHeader activitiesOption={activitiesOption} activityHandler={activityHandler} />
            {(activityData.length > 0 && !noActivityOccure) && <ActivitesContent activityData={activityData} />}
            {activityData.length === 0 && <ActivitesIcon />}
            {(activityData.length > 0 && noActivityOccure) && <NoActivitiesText />}
        </div>
    )
};

export default Activities;