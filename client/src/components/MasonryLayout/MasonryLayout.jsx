import Masonry from "react-masonry-css";
import "./style.scss";
import Available from "../Available/Available";
import Pin from "../Pin/Pin";

import { breakpointObj } from "../../utils/constants";

const MasonryLayout = ({ pins }) => {
    return (
        <>
            <Masonry className="masonry-wrapper" breakpointCols={breakpointObj}>
                {pins.map((pin) => (
                    <Pin pin={pin} key={pin._id} className="w-screen" />
                ))}
            </Masonry>
        </>
    );
};

export default MasonryLayout;
