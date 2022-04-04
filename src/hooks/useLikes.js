import { useContext } from "react";
import { likesContext } from "../context/likesContext";
import { addToLikesService, removeLikesService } from "../services";
import { likesActions } from "../reducers/actionTypes";
import { useAuth } from "./useAuth";
import toast from "react-hot-toast";

const { INITIALIZE, SET_ERROR, SET_LIKEDLIST } = likesActions;

const useLikes = () => {
  const { likesState, likesDispatch } = useContext(likesContext);

  const {
    authState: {
      userDetails: { token },
    },
  } = useAuth();

  const addToLike = async video => {
    try {
      likesDispatch({ type: INITIALIZE });

      const res = await addToLikesService(video, token);

      if (res.status === 201) {
        likesDispatch({ type: SET_LIKEDLIST, payload: res.data.likes });
        toast.success("Liked", { position: "bottom-center" });
      }
    } catch (err) {
      likesDispatch({ type: SET_ERROR, payload: err.response.data.error[0] });
      toast.error(err.response.data.error[0], { position: "bottom-center" });
    }
  };

  const removeFromLike = async id => {
    try {
      likesDispatch({ type: INITIALIZE });

      const res = await removeLikesService(id, token);

      if (res.status === 200) {
        likesDispatch({ type: SET_LIKEDLIST, payload: res.data.likes });
        toast.success("Removed from liked", { position: "bottom-center" });
      }
    } catch (err) {
      likesDispatch({ type: SET_ERROR, payload: err.response.data.error[0] });
      toast.error(err.response.data.error[0], { position: "bottom-center" });
    }
  };

  return { likesState, addToLike, removeFromLike };
};

export { useLikes };
