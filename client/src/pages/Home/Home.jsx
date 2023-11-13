import { useEffect } from "react";
import { connect, useDispatch } from "react-redux";

import "./style.scss";
import * as actions from "../../store/actions";
import Spinner from "../../components/Spinner/Spinner";
import MasonryLayout from "../../components/MasonryLayout/MasonryLayout";
import Available from "../../components/Available/Available";

const Home = ({ fetchAllPin, isLoadingPins, pinsData }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }, [isLoadingPins]);

    useEffect(() => {
        const fetchData = async () => {
            await fetchAllPin();
        };
        fetchData();
    }, [dispatch]);

    return (
        <div className="home-wrapper">
            {isLoadingPins ? (
                <Spinner />
            ) : pinsData && pinsData?.length > 0 ? (
                <div className="home-container">
                    <MasonryLayout pins={pinsData} />
                </div>
            ) : (
                <Available />
            )}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        isLoadingPins: state.pin.fetchPinLoading,
        pinsData: state.pin.pinsData,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllPin: () => dispatch(actions.fetchAllPin()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
