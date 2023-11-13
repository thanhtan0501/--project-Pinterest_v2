import { useEffect, useState } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions";

import { useLocation } from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner";
import MasonryLayout from "../../components/MasonryLayout/MasonryLayout";

const Search = ({ isLoadingPins, pinsData, fetchPinBySearch }) => {
    const { state } = useLocation();
    const [pins, setPins] = useState([]);
    const { searchTerm } = state;
    useEffect(() => {
        if (searchTerm) {
            const fetchPin = async () => {
                await fetchPinBySearch(searchTerm, "");
            };

            fetchPin();
        } else setPins([]);
    }, [searchTerm]);
    useEffect(() => {
        if (!isLoadingPins) {
            setPins(pinsData);
        }
    }, [pinsData]);
    console.log("check data: ", pins);

    return (
        <div style={{ paddingTop: "12px" }}>
            {isLoadingPins && <Spinner />}
            {pins?.length !== 0 && <MasonryLayout pins={pins} />}

            {pins?.length === 0 && searchTerm !== "" && !isLoadingPins && (
                <div
                    className="mt-10 text-center text-xl"
                    style={{
                        marginTop: "20px",
                        textAlign: "center",
                        fontSize: "20px",
                        fontWeight: 600,
                    }}
                >
                    No Pins Found!!
                </div>
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
        fetchPinBySearch: (searchQuery, tags) =>
            dispatch(actions.fetchPinBySearch(searchQuery, tags)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
